// var log = function(message) {
//   console.log(message)
// }
const log = message => console.log(message)

var createScream = function(logger) {
  return function(message) {
    logger(message.toUpperCase() + "!!!")
  }
}

const scream = createScream(message => console.log(message))

let color_lawn = {
  title: "lawn",
  color: "#00FF00",
  rating: "0"
}

// var rateColor = function(color, rating) {
//   return Object.assign({}, color, {rating:rating})
// }

const rateColor = (color, rating) => ({
    ...color,
    rating
})

const invokeIf = (condition, fnTrue, fnFalse) => (condition) ? fnTrue() : fnFalse()

const showWelcome = () => console.log("Welcome back, Commander.")

const showUnauthorized = () => console.log("INTRUDER ALERT!")

//invokeIf(true, showWelcome, showUnauthorized)
//invokeIf(false, showWelcome, showUnauthorized)

// I'm still trying to wrap my head around how this next feller works...
// const userlogs = userName => message => 
//     console.log(`${userName} -> ${message}`)

// const log = userlogs("clanwolf666")

// log("attempting to load 20 fake members")
// getFakeMembers(20).then(
//     members => log(`successfully loaded ${members.length} members.`),
//     error => log("encountered an error loading members")
// )

/*  
    Ok, I think I kind of get it. I don't know if this
    makes sense, but it's like the higher-order function
    ('userlogs', in this case) is a weapon that has a two-
    stage firing mechanism. The first stage ('charging' it
    with the initial username) takes the safety off by
    loading it with the generic prepender, and then it can
    be 'fired' by calling the 'charged' function with another
    message attached, the async message we ultimately care
    about.

    ... yeah, that made no sense. But I think I get it
    intuitivelyish now, and that's ultimately what's important.
*/

// ====================================
//          RECURSION
// ====================================

// yessssss recursion is my favoriteeeeee

// Huh. I never thought of doing these as one-line conditionals,
// but this is succinct as FUCK.

// ok, so the 'fn' parameter is not used in the recursion here
// because it is expecting to take the 'console.log()' function
// as the second parameter
const countdown = (value, fn) => {
    fn(value)
    return (value > 0) ? countdown(value-1, fn) : value
}
// honestly, this seems like kind of a toy function. It would
// make more sense to just 'console.log' directly here.

const countdownClock = (value, fn, delay=1000) => {
    fn(value)
    return (value > 0) ?
        setTimeout(() => countdownClock(value-1, fn, delay), delay) :
        value
}
// WHY IS JAVASCRIPT SO FUCKING WEIRD
// ... oh yeah, because asychronous programming is weird and
// javascript is probably first-in-class at handling async.

// countdown(10, value => console.log(value));
//countdownClock(10, value => console.log(value));
/*
    This is how the book suggested it be done, but 
    it is not strictly necessary. I think it's just to
    make the code more readable.
*/
// let log = value => console.log(value)
// countdownClock(10, log);

var dan = {
    type: "person",
    data: {
        gender: "male",
        info: {
            id: 22,
            fullname: {
                first: "Dan",
                last: "Deacon"
            }
        }
    }
}

const deepPick = (fields, object={}) => {
    const [first, ...remaining] = fields.split(".")
    return (remaining.length) ? //because '0' is falsey
        deepPick(remaining.join("."), object[first]) :
        object[first]
}

// console.log(deepPick("type", dan));
// console.log(deepPick("data.info.fullname.first", dan));

// ====================================
//            COMPOSITION
// ====================================

/*  "Functional programs break up their logic into small pure
    functions that are focused on specific tasks. Eventually, 
    you will need to put these smaller functions together."

    How very unix-like. It seems like this is probably a 'best-
    practices' principle for large systems generally
*/ 

// chaining is key! (and also very unix-like)

// the '.replace()' method is built into JavaScript Strings
const template = "hh:mm:ss tt";
const clockTime = template.replace("hh", "03")
    .replace("mm", "33")
    .replace("ss", "33")
    .replace("tt", "PM");
// notice that "clockTime" only takes the return value of the
// last function in the chain

// console.log(clockTime)
// console.log(template) // make sure we still have an unspoiled original

// Goal of composition is to "generate a higher order function by combining
// simpler functions"

// 'both' function pipes a value through two separate functions. The output
// the inner function becomes the input for the outer function. You'll see
// what I mean in a right jiffy.

const both = date => appendAMPM(civilianHours(date))

// ... but this is gross and stupid. It's already hard to read (hence the
// explanation text above), and you'll quickly descend into Closure-esque
// parenthesis hell if you're trying to chain more than 2 functions together.

// A better, more elegant solution would be something like...

const both = compose(
    civilianHours,
    appendAMPM
)

// If this is implemented right, it would allow you to chain together an
// arbitrary number of functions together AND would let you put them in
// the order in which you want them to take effect!

// ... I have a rock-hard engineer boner right now. But so liek how we do dis?

const compose = (...fns) => 
    (arg) => // ok, this is the initial argument for the innermost function
        fns.reduce(
            (composed, f) => f(composed),
            arg
        )
// .........oh god, imma haffa think about this o.0

// Functional programming is super simple to think about, but functional
// programs can be super hard to reason about sometimes! xD
