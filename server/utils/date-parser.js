const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

exports.getCurrentDay = function () {
    const today = new Date();
    return weekday[today.getDay()];
}

exports.getCurrentTime = function ( ) {
    const today = new Date();
    return `${today.getHours()}:${today.getMinutes()}`
}
