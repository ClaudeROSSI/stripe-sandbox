(async () => {

  function checkTimeValidity(timezone, startedAt, from, to) {
    // Time range restriction can be from 20:00 to 08:00 or from 08:00 to 20:00
    const timeFrom = moment(from || '00:00', 'HH:mm');
    const timeTo = moment(to || '00:00', 'HH:mm');
    const spanTwoDays = timeTo.isBefore(timeFrom);
    const dateMin = moment().tz(timezone).set({ hour: timeFrom.get('hour'), minute: timeFrom.get('minute') });
    const dateMax = moment().tz(timezone).set({ hour: timeTo.get('hour'), minute: timeTo.get('minute') });
    let ok; 
    if (spanTwoDays ) {
      ok = !isBetween(timezone, startedAt, timeTo, timeFrom);
    } else {
      ok = isBetween(timezone, startedAt, timeFrom, timeTo);
    }
    if ( ok ) {
      console.log(dump(timezone, startedAt) + ` - isBetween `  + dump(timezone, dateMin) + ' - '  + dump(timezone, dateMax) );
      return true;
    } else {
      console.log(dump(timezone, startedAt) + ` - is NOT Between `  + dump(timezone, dateMin) + ' - '  + dump(timezone, dateMax) );
      return false;
    }
  }

  function isBetween(timezone, startedAt, timeFrom, timeTo) {
    // Check timeFrom
    const dateMin = moment().tz(timezone).set({ hour: timeFrom.get('hour'), minute: timeFrom.get('minute') });
    if (moment(startedAt).tz(timezone).isBefore(dateMin)) {
      console.log(dump(timezone, startedAt) + ` - isBefore ` + dump(timezone, dateMin) );
      return false;
    }
    // Check timeTo
    const dateMax = moment().tz(timezone).set({ hour: timeTo.get('hour'), minute: timeTo.get('minute') });
    if (moment(startedAt).tz(timezone).isSameOrAfter(dateMax)) {
      console.log(dump(timezone, startedAt) + ` - isSameOrAfter`  + dump(timezone, dateMax) );
      return false;
    }
    // console.log(dump(timezone, startedAt) + ` - isBetween `  + dump(timezone, dateMin) + ' - '  + dump(timezone, dateMax) );
    return true;
  }

  function dump( timezone, startedAt ) {
    return startedAt.tz(timezone).format('LT');
    // return '' + startedAt.get('hour') + ':'+ startedAt.get('minute') ;
  }

  //var moment = require('moment')
  var moment =require('moment-timezone');
  
  // const today = new Date();
  // console.log(`today: ${today}`);
  const timezone = "Europe/Paris";
  // const timezone = "America/New_York";

  // console.log(checkTimeValidity(timezone, moment(), '23:00', '01:00'));
  console.log('-------------------------------');
  console.log('Expecting TRUE');
  console.log('-------------------------------');
  console.log(checkTimeValidity(timezone, moment(), '23:00', '13:00'));
  console.log(checkTimeValidity(timezone, moment(), '12:00', '13:00'));
  console.log(checkTimeValidity(timezone, moment(), '12:00', '01:00'));
  console.log(checkTimeValidity(timezone, moment(), '12:30', '12:59'));

  console.log('-------------------------------');
  console.log('Expecting FALSE');
  console.log('-------------------------------');
  console.log(checkTimeValidity(timezone, moment(), '23:00', '12:00'));
  console.log(checkTimeValidity(timezone, moment(), '00:00', '12:00'));
  console.log(checkTimeValidity(timezone, moment(), '00:00', '12:35'));

})();