(async () => {

  var moment = require('moment')
  var Decimal = require('decimal.js');

  

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
  
  
  const x = new Decimal(new Date().getTime()).div(1000).trunc().toNumber()
  console.log(`x: ${x}`);
  




})();