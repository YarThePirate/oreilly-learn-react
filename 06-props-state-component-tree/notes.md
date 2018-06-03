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
...TO BE CONTINUED