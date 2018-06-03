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

