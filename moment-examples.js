var moment = require('moment');
var now = moment();

// console.log(now.format());
//
console.log(now.format('X')); //unix timestamp in seconds
console.log(now.format('x')); //unix timestamp in milliseconds

var timestamp = now.valueOf('x');
var timestampMoment = moment().local().utc(timestamp);

console.log(timestampMoment.format('h:mm a'));

// now.subtract(1,'year');
//
// console.log(now.format());
// console.log(now.format('MMM Do YYYY, H:mm:ss a '));
