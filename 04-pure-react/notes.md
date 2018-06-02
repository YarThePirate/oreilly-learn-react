### Chapter 4: Pure React

Notes: I loaded up the "reload" tool from npm so I wouldn't have to manually restart my html because I'm not a fucking peasant.

Sooooo.... This chapter we'll be working with "Pure React", as opposed to React with JSX and all that good stuff. I didn't even know that was a thing; I assumed the "pure" was a functional programming reference. Interdasting.

We need 2 things: React and ReactDOM
- ReactDOM is library used to do the actual browser rendering
- ReactDOM was split from React to allow React components to render in other targets
    - specifically, the notes say "...paves the way to writing components that can be shared between the web version of React and React Native"
    - as more and more RN plugins are created (i.e. Winderps, OS X, etc) this is going to get more and more interdastinger

....We need 3 things: the two above, plus an HTML render target
- it looks like this will be done in HTML, not wavaskript

Pure React creation of an h1 elemement with ID and data-type attributes:

    React.createElement("h1", {id: "recipe-0", 'data-type': "title"}, "Baked Salmon")
    
    // React.createElement(<element_type>, <attrs_object>, <children>)
- attrs_obj should be "null" if it has no attributes

React also adds a "data-reactroot" attr, so final looks like:

    <h1 data-reactroot id="recipe-0" data-type="title">Baked Salmon</h1>

The 'render()' method actually lives in ReactDOM, which means a different 'render()' method is used in React Native. Makes sense, actually.
- First argument is element to render
- second argument is target node (where we should render it)

Three options for creating React components:
1. React.createClass()
2. ES6 class notation (this is the one I'm used to)
3. Stateless Functional Components

The book reccommends using option 3 as much as possible. I suppose that makes sense. Less overhead and all that.
- take in props and return a DOM element
- good way to practice rules of functional programming
- encourages simplicity and makes codebase extremely testable
- BUT you can't use them if you need to encapsulate functionality or have 'this' scope, these ams a no-go

## Factories
I'm kind of excited to learn about these. I've heard them mentioned and seen them used, but I don't know what dey is.

"A factory is a special object that can be used to abstract away the details of instantiating objects."

Hm. React has a lot of factories built-in for all of the commonly supported HTML/SVG DOM elements. And you can use React.createFactory() to make your own!

Oh, ok. If we were to build our "Baked Salmon" example with a Factory, it would take the form

    React.DOM.h1(null, "Baked Salmon");

Likewise, the ingredients would be built with

    React.DOM.li(null, "<item>");

Hm. You can simplify your code by calling components as functions by explicitly creating factories.

From the book:
"If you are not working with JSX, you may find using factories preferable to numerous React.createElement calls. ... If you use JSX with React, chances are you will never use a factory.