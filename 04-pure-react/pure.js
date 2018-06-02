var dish = React.createElement("h1", null, "Baked Salmon");

var items = [
    "1 lb Salmon",
    "1 cup Pine Nuts",
    "2 cups Butter Lettuce",
    "1 Yellow Squash",
    "1/2 cup Olive Oil",
    "3 cloves of Garlic"
]

var ingredients = React.createElement(
    "ul",
    { className: "ingredients" },
    items.map((ingredient, i) => 
        React.createElement("li", { key: i }, ingredient)
    )
)
// React.createClass() implementation
// const IngredientsList = React.createClass({
//     displayName: "IngredientsList",
//     renderListItem(ingredient, i) {
//         return React.createElement("li", { key: i }, ingredient)
//     },
//     render() {
//         return React.createElement(
//             "ul",
//             { className: "ingredients" },
//             this.props.items.map(this.renderListItem)
//         )
//     }
// })

const IngredientsList = ({ items }) => // destructuring the props element to get items
    React.createElement("ul", {className: "ingredients"},
        items.map((ingredient, i) => // don't need "props." anymore!
            React.createElement("li", { key: i }, ingredient)
        )
    )

const Ingredients = React.createFactory(IngredientsList)

ReactDOM.render(
    Ingredients({ items }),
    document.getElementById('react-container'));