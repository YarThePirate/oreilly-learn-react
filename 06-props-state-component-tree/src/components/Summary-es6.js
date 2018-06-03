class Summary extends React.Component {
    render() {
        const {ingredients, steps, title} = this.props
        return (
            <div className="summary">
                <h1>{title}</h1>
                <p>
                    <span>{ingredients} Ingredients | </span>
                    <span>{steps} Steps</span>
                </p>
            </div>
        )
    }
}

Summary.propTypes = {
    ingredients: PropTypes.number,
    steps: PropTypes.number,
    title: (props, propName) =>
        (typeof props[propName] !== 'string') ?
            new Error("A title must be a string!") :
            (props[propName].length > 20) ?
                new Error("title is over 20 characters!") :
                null
}

Summary.defaultProps = {
    ingredients: 0,
    steps: 0,
    title: "[ untitled recipe ]"
}