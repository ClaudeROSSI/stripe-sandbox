(async () => {

  //var moment = require('moment')
  var moment =require('moment-timezone');

  
  console.log("now: " + moment().toDate());
  console.log("last month 1st day: " + moment().date(0).date(1).startOf('day').toDate());
  console.log("last month last day: " + moment().date(1).startOf('day').toDate());
  console.log("--------------------------------------");
  var tz = "America/Los_Angeles";
  console.log("now: " + moment.tz(moment(), tz).toDate());
  console.log("last month 1st day: " + moment.tz(moment().date(0).date(1).startOf('day'),tz).toDate());
  console.log("last month last day: " + moment.tz(moment().date(1).startOf('day'),tz).toDate());
  console.log("--------------------------------------");
  console.log(moment().date(0).date(1).startOf('day').toDate());
  console.log(moment().date(1).startOf('day').toDate());
  console.log("--------------------------------------");

  const aDate = new Date();
  const theTime = aDate.getTime();
  const unixDate = moment.unix(Math.trunc(theTime / 1000));
  const aSecondDate = unixDate.toDate();
  const theSecondTime = aSecondDate.getTime();
  
  console.log(`aDate: ${aDate}`);
  console.log(`theTime: ${theTime}`);
  console.log(`unixDate: ${unixDate}`);
  console.log(`aSecondDate: ${aSecondDate}`);
  console.log(`theSecondTime: ${theSecondTime}`);

  var london    = moment.tz(aDate, "Europe/London");
  var newYork    = moment.tz(aDate, "America/New_York");
  var losAngeles    = moment.tz(aDate, "America/Los_Angeles");

  console.log(`london: ${london}`);
  console.log(`newYork: ${newYork}`);
  console.log(`losAngeles: ${losAngeles}`);
  
})();