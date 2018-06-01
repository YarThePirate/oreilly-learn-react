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
//         IMPERITIVE SOLUTION
// ====================================

// Log Clock Time every Second
setInterval(logClockTime, 1000);

function logClockTime() {

    // Get Time string as civilian time
    var time = getClockTime();

    // Clear Console and log time again
    console.clear();
    console.log(time);
}

function getClockTime() {

    // Get Current Time
    var date = new Date();
    var time = "";

    // Serialize clock time
    var time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ampm: "AM"
    }

    // Convert to civilian time
    if (time.hours == 12) {
        time.ampm = "PM";
    } else if (time.hours > 12) {
        time.ampm = "PM";
        time.hours -= 12;
    }

    // Prepend a 0 on the hours to make double digits
    if (time.hours < 10) {
        time.hours = "0" + time.hours;
    }

    // Prepend a 0 on the minutes to make double digits
    if (time.minutes < 10) {
        time.minutes = "0" + time.minutes;
    }

    // ...and now seconds
    if (time.seconds < 10) {
        time.seconds = "0" + time.seconds;
    }

    // Format the clock time as string "hh:mm:ss tt"
    return time.hours + ":"
        + time.minutes + ":"
        + time.seconds + " "
        + time.ampm;
}