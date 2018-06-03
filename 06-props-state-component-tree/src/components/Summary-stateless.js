const Summary = ({ ingredients, steps, title }) => {
    return <div>
        <h1>{title}</h1>
        <p>{ingredients} Ingredients | {steps} Steps</p>
    </div>
}

Summary.propTypes = {
    ingredients: React.PropTypes.number.isRequired,
    steps: React.PropTypes.number.isRequired
}

Summary.defaultProps = {
    ingredients: 1,
    steps: 1
}