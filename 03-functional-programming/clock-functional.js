/*
    Three simple rules to guide functional programming:

    1. Keep data immutable.
    2. Keep functions pure - accept at least one argument, return
        data or another function.
    3. Use recursion over looping (wherever possible)
*/

/*
    THE GOAL: A ticking clock!
    
    - should display hours, minutes, seconds, and time of day in civilian time
    - each field must ALWAYS have double-digits (must have leading 0's!)
    - clock must "tick" and change the display every second
*/

// ====================================
//         FUNCTIONAL SOLUTION
// ====================================

// some simple fellers wut ta manage the terminal wit
const oneSecond = () => 1000
const getCurrentTime = () => new Date()
const clear = () => console.clear()
const log = message => console.log(message)

// some functions for transforming data

// takes in Date object, returns simpler 'time' object
const serializeClockTime = date =>
({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
})

// converts time to 12-hour format
const civilianHours = clockTime => 
({
    ...clockTime,
    hours: (clockTime.hours > 12) ?
        clockTime.hours - 12 :
        clockTime.hours
})

// appends 'AM'/'PM'
const appendAMPM = clockTime => 
({
    ...clockTime,
    ampm: (clockTime.hours > 12) ? "PM" : "AM"
})

// --------------------------------
//  HIGHER-ORDER UTILITY FUNCTIONS
// --------------------------------

const display = target => time => target(time)

// I'm not 100% sure what the point of using a higher-order function here
// is. You're just pushing your hard-coding off into the replace statements
// where it's harder to read. :-/
const formatClock = template => time =>
    template.replace("hh", time.hours)
            .replace("mm", time.minutes)
            .replace("ss", time.seconds)
            .replace("tt", time.ampm)

// It looks like this guy only works on one field at a time. Let's see if
// this has to be called separately for each field (hours, mins, secs)
const prependZero = key => clockTime =>
({
    ...clockTime,
    [key]: (clockTime[key] < 10) ?
        "0" + clockTime[key] :
        clockTime[key]
})

// --------------------------------
//     COMPOSITIONAL FUNCTIONS
// --------------------------------

const compose = (...fns) =>
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        )

const convertToCivilianTime = clockTime => 
    compose (
        appendAMPM,
        civilianHours
    )(clockTime)

const doubleDigits = civilianTime =>
    compose (
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime)

const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    )

startTicking()


/*
    Ok, so I hear the words like "easily testable", "easily reusable",
    "scalable", blahbity bloop, but right now this just seems like a WAY
    harder and more complicated way to dome something pretty easy.

    But maybe that's just because I'm still kind of wrapping my head around
    the functional paradigm. It'll definitely get easier the more I practice
    it; hopefully the benefits will become obvious to me as well.
*/