const StarRating = createClass({
    displayName: 'StarRating',
    propTypes: {
        totalStars: PropTypes.number
    },
    getDefaultProps() {
        return {
            totalStars: 5
        }
    },
    getInitialState() { // gotta set the state
        return {
            starsSelected: 0
        }
    },
    change(starsSelected) { // event handler
        this.setState({starsSelected})
    },
    render() {
        const {totalStars} = this.props // yay, ES6!
        const {starsSelected} = this.state // yay, ES6!
        return (
            <div className="star-rating">
                {[...Array(totalStars)].map((n, i) =>
                    <Star   key={i}
                            selected={i < starsSelected}
                            onClick={() => this.change(i+1)}
                    />
                )}
                <p>{starsSelected} of {totalStars} stars</p>
            </div>
        )
    }
})