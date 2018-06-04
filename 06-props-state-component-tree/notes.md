# Chapter 6: Props, State, and the Component Tree
The last chapter was focussed on creating components and building things with React; this chapter is more focussed on techniques to help you better manage data and reduce debugging time.

According to the book: "Data handling within component trees is one of the key advantages of working with React." And this makes sense. If emphasis is placed on creating functional components and there's only a single flow for the data, then it should be fairly intuitive to work with data as it moves through the application. The book states (and I agree) that applications are much easier to reason about and much easier to scale if we can manage data from a single location.

## Property Validation
Javascript is a loosely typed language, and while this can make development easier (if the developer is a sloppy barbarian with no sense of elegance or grace, but I digress), it can lead to a lot of inefficiencies at runtime. This is especially true since JavaScript is a just-in-time scripting language, which means that the interpreter does a **lot** of the heavy lifting when it comes to optimizing the code.

Fortunately, since React is primarily a type-driven, functional paradigm (like a civilized programming pattern), it provides a bunch of ways to validate property types.

There's a table of built-in React property type validations:
- Arrays    ->      React.PropTypes.array
- Boolean   ->      React.PropTypes.bool
- Functions ->      React.PropTypes.func
- Numbers   ->      React.PropTypes.number
- Objects   ->      React.PropTypes.object
- Strings   ->      React.PropTypes.string

Our goal here is to create a summary component with three properties: a title, an array of ingredients, and an array of steps. This will be our toy project to validate for strings, arrays, and to provide defaults. Also, ES6 classes and stateless functions have different ways of implementing property validation.

### Validating Props with createClass
So why is it important to validate property types, anyway?

BECAUSE JAVASCRIPT IS A LOOSELY TYPED LANGUAGE AND SHARES A LOT OF METHODS BETWEEN DIFFERENT TYPES, THAT'S WHY

For example, if we have a component that expects an array prop and does some computation based on that prop's length, It's not going to complain if you pass in, say, a string. It won't complain... but it will be wrong. And since there's no runtime error, that would be two-and-a-half bitches to debug.

when you use <code>createClass</code>, you specify the propTypes by including a <code>propTypes</code> object at the top level (adjacent to where <code>render()</code> would be). It might look something like this:

    propTypes: {
        ingredients: PropTypes.array,
        steps: PropTypes.array,
        title: PropTypes.string
    }

This will now throw an error to the console if an incorrect property type is used. This does not, however, throw an error if *no* property is supplied, but if any methods or anything are called on that property ('length', say) it will cause the app to crash. This happens because 'undefined' doesn't have a 'length' property.

If a property *must* be present for the component to work, you can specify that as well. You would just mark it with <code>isRequired</code> in the <code>propTypes</code> object:

    propTypes: {
        ingredients: PropTypes.array.isRequired,
        steps: PropTypes.array.isRequired,
        title: PropTypes.string
    }

*Now* if we try and render that component with either the ingredients or steps properties absent, JavaScript will throw an error related to the missing property. This makes things much easier to debug than trying to trace down the source of a 'method not found' error on the 'undefined' object.

You can also specify **default properties** using the <code>getDefaultProps()</code> method (again using <code>createClass</code>). Note that this is a function, not just a key. Specifying default props with <code>getDefaultProps()</code> might look something like this:

    getDefaultProps() {
        return {
            ingredients: 0,
            steps: 0,
            title: "[untitled recipe]"
        }
    }

This would again be placed at the same level as <code>propTypes</code> or <code>render()</code>, again paying attention to the fact that this one is a function and doesn't use colon syntax.

### Custom Property Validation
It is also possible to define your own property validators to handle hand-jammed types or to specify more robust checking (i.e. if something has to be a number *within a certain range* or if a value has to *contain a specific string*).

This is implemented with a function. It should return <code>error</code> if the validation fails or <code>null</code> if it succeeds. Which is a bit weird. But whatever. I don't make the rules.

All custom validations are specified in the propTypes object, as you might expect. For example, if we wanted to limit our title string to be **1) a string** and **2) limited to 20 characters**, we might do sommat liek dis:

    propTypes: {
    ingredients: PropTypes.number,
    steps: PropTypes.number,
    title: (props, propName) => 
        (typeof props[propName] !== 'string') ?
            new Error("A title must be a string") : 
            (props[propName].length > 20) ?
                new Error(`title is over 20 characters`) :
                null
    }

And that's basically it.

### ES6 Classes and Stateless Functional Components
So up to now, we've only been discussing how to do this stuff for components made with the <code>createClass()</code> method, which, as we've discussed, is not how things are generally done in the now-days. So how would we do that using some of the more modern component creation methods?

For ES6 Class components, the <code>propTypes</code> and <code>defaultProps</code> are actually specified *outside the class body* (see 'src/components/Summary-es6.js' for an example).

Those two specifications can be added to stateless functional components as well (see 'src/components/Summary-stateless.js'). However, with stateless components, you have the added bonus of being able to set defaults directly in the function arguments:

    const Summary = ({ ingredients=0, steps=0, title='[ untitiled recipe ]' }) => {
        return <div>
            <h1>{title}</h1>
            <p>{ingredients} Ingredients | {steps} Steps</p>
        </div>
    }

So yeah. Not that bad. Note that the syntax for stateless components is similar to ES6 classes, in that they are specified outside of the actual class definition.

Anyway, the book recommends implementing property validation (and custom validation, if necessary) and default values as often as possible. Makes sense; it will prevent fatal crashes and will make things easier to debug.

## Refs
Ok. I see these every once in while on Enki and I have no idea what they are. So time to see why they're so important, I suppose.

The book says they are "...a feature that allow React components to interact with child elements. The most common use case for refs is to interact with UI elements that collect input from the user."

An example would be rendering a form, and then allowing it to react based on what the user schlapps on it. Not sure how this applies, but I guess we'll see.

It looks like it offers very similar "update" features as JQuery, except in a much more complicated and syntactically ugly way. Not sure how I feel about that.

Refs are not references in the low-level, C/C++ or Rust sense. They're just tags that are attached to input elements that allow you to handle Ajax events more gracefully. If your input element has a <code>_title</code> ref on it, then it can be accessed via <code>this.refs_title</code>.

Now that I'm looking at it, this is pretty handy. Prior to this, I was trying to track the status of each input value in the component's state, and that was always a bit clunky and unwieldly. The syntax for refs is super gross, but at the end of the day it's a way more elegant solution. I'll have to remember that.

Also: remember that for any methods you define on your components, you have to remember to bind the scope of <code>this</code> in the constructor (except you don't have to do this when using React.createClass)!

### Inverse Data Flow
*Inverse data flow* is a common solution for collecting data from a React component. It's also known as *two-way data binding* (which is a thing I thought React was trying to get away from. Single source of truth and all...). It involves sending the component a **function as a property**, which in turn sends **data back as arguments**.

In practical terms, what you would do is define a function on the parent component, then pass that function down to the child as a property. For example, if <code>AddColorForm</code> was the component handling the reverse data flow we were interesting in, you might in its parent do something like this:

    const logColor = (title, color) => 
        console.log(`New Color: ${title} | ${value}`)

    <AddColorForm onNewColor={logColor} />

And then in AddColorForm itself, you would put this in the <code>submit</code> method (or whatever other method you decide will handle the action):

    submit() {
        const {_title, _color} = this.refs
        this.props.onNewColor(_title.value, _color.value)
        _title.value = ''
        _color.value = '#000000'
        _title.focus()
    }

This will just call whatever function was assigned to <code>onNewColor</code> when <code>AddColorForm</code> was instantiated - and since that function was declared in the parent, the parent would receive the return values and would therefore have access to the data. This would let you push off all server events to the root component and just hand up data as necessary. With that architecture, I kind of think of the root component as a "network/infrastructure backbone" for the app.

Using refs and inverse data flows allows you to design lower-level collection components that don't have to worry about what actually *happens* to the data. They just collect it and pass it up back up the chain. I actually like this quite a bit.

Just like with any other property, it's also a good idea to define a <code>propType</code> and a <code>defaultProps</code> for the ref handler. Some sensible, dummy defaults are provided below:

    AddColorForm.propTypes = {
        onNewColor: PropTypes.func
    }

    AddColorForm.defaultProps = {
        onNewColor: f=>f
    }

### Refs in Stateless Functional Components
OH GOD WHY ARE THERE THREE WAYS TO DO EVERYTHING FFFFFUUUUUU-

Ok, the big difference here is that stateless functional components (FUCK IT. They're going to be 'SFC's from now on) do not have <code>this</code>. The functional will just be passed as an argument instead. Another difference is that refs on the actual input elements are set with callbacks rather than strings. They are then accessed like local variables, omitting the <code>this</code>.

See 'src/components/AddColorFormSFC.js' for an example.

...Also, there doesn't seem to be any technical explanation about why refs are named starting with an underscore. I'm guessing it's just a convention.

## React State Management
*State*, unlike properties, represents application data that is *mutable* (usually through user interaction). Component state gives React a way to control when the window has to be rerendered. Basically, any UI component that can change (blinking lights, toggles, etc) is going to have to either have state itself or respond to state changes from a parent component.

### Introducing Component State
In keeping with the recommendation that we use as many *stateless* functional components as possible, it is a good idea to hoist state up as high in component tree as possible. Use child components' <code>onClick</code> functions to pass data back up to a stateful parent, which then changes its state in response, and that new data will then be reflected back in the stateless children via new properties.

(NOTE: look up how the 'clip-path' css property works. Like anything else in CSS it looks like a HUMONGOUS pain in the ass to hand-jam, but it lets you turn rectangles into stars, so hey. Probably worth exploring.)

For a super elegant example of how to implement an IMDB-esque star rating system (assuming a <code>Star</code> component has already been written), see 'src/components/StarRating-cc.js' for a <code>createClass</code> example, and 'src/components/StarRating-es6.js' for an ES6 class syntax example. There is no SFC example for this stateful component for what are hopefully obvious reasons.

NOTE: The reason you call <code>super</code> in child components (or in anything that extends <code>React.Component</code>) is that the <code>super</code> call is what *actually instantiates the component*. After that, it's just decorated with whatever properties and state management it needs.

State can *only* be changed by calling <code>this.setState</code>. This will update the specific parts of the object that need it and then call <code>render()</code> again.

### Initializing State from Properties
It's pretty rare that we will use properties to initialize our state, since we always try to hoist our state as high as possible. The most common case is when we create a reusable component class that we'd like to use across different component trees.

The best practice is to call the special lifecycle method <code>componentWillMount()</code>. It gives you access to both the props and the <code>setState</code> method, so you can use the one to feed the other. It would looka little sommin liek dis:

    componentWillMount() {
        const { starsSelected } = this.props
        if (starsSelected) {
          this.setState({starsSelected})
        }
    }

But there's an even easier way to do it with ES6 Class components. You can just set the state directly when you write the constructor, like so:

    constructor(props) {
        super(props)
        this.state = {
            starsSelected: props.starsSelected || 0
        }
        this.change = this.change.bind(this)
    }

By and large, setting state from properties is something you should avoid whenever possible, though. However, if you *do* do this, and the parent's properties change on you and you have to have that reflected in your child component, you'll need to use the <code>componentWillReceiveProps</code> lifecycle method to properly handle those changes.

## State Within the Component Tree
As mentioned above (and in several other React tutorial documents), your goal should be to limit the number of components that have state as much as possible. As the book puts it, "The joy of using React does not come from chasing down state variables all over your application." If all of the state is contained in the root component and passed down via properties and up via two-way function binding, your application can be said to have a *single source of truth*.

But this raises some questions about how best to architect an application like this. So let's learn!

**Presentational Components** are components that are purely UI-Related: they are only concerned with how things look and are good candidates to refactor to SFCs. All data is sent to them as properties and passed back via callback functions.

### Passing Data bck Up the Component Tree
In order to more efficiently handle passing data back and forth, you should give components a unique ID. You can use the <code>uuid</code> library to accomplish this. 

    npm install uuid --save

Notice that they have it saved to the app dependency tree, not the developer dependencies. You'll have to read the uuid docs to figure out how that works. Look specifically for something called "<code>v4</code>". But you would set your id equal to <code>v4()</code> after importing that from the uuid library.