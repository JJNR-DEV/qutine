let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

exports.getCurrentDay = function () {
    const today = new Date();
    return weekday[today.getDay()];

}

exports.getCurrentTime = function ( ) {
    const today = new Date();
    return `${today.getHours()}:${today.getMinutes()}`
}
