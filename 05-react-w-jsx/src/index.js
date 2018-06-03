import React from 'react'
import { render } from 'react-dom'
import Menu from './components/Menu'
import data from './data/recipes'

window.React = React

// A call to ReactDOM.render to render our Menu into the current DOM
render(
    <Menu recipes={data} />,
    document.getElementById("react-container")
)