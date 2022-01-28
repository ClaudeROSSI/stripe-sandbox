(async () => {

  function checkTimeValidityxxx(timezone, startedAt, from, to) {
    // Time range restriction can be from 20:00 to 08:00 or from 08:00 to 20:00
    const timeFrom = moment(from || '00:00', 'HH:mm');
    const timeTo = moment(to || '00:00', 'HH:mm');
    const spanTwoDays = timeTo.isBefore(timeFrom);
    // Check timeFrom
    const dateMin = moment().tz(timezone).set({ hour: timeFrom.get('hour'), minute: timeFrom.get('minute') });
    if (spanTwoDays) {
      // e.g.: Time range from 23:00 to 11:00 - spanning two days!
      dateMin.add(-1, 'days');
    }
    if (moment(startedAt).tz(timezone).isBefore(dateMin)) {
      console.log(dump(timezone, startedAt) + ` - isBefore ` + dump(timezone, dateMin) );
      return false;
    }
    // Check timeTo
    const dateMax = moment().tz(timezone).set({ hour: timeTo.get('hour'), minute: timeTo.get('minute') });
    if (spanTwoDays) {
      // e.g.: Time range from 23:00 to 11:00 - spanning two days!
      dateMax.add(1, 'days');
    }
    if (moment(startedAt).tz(timezone).isSameOrAfter(dateMax)) {
      console.log(dump(timezone, startedAt) + ` - isSameOrAfter`  + dump(timezone, dateMax) );
      return false;
    }
    console.log(dump(timezone, startedAt) + ` - isBetween `  + dump(timezone, dateMin) + ' - '  + dump(timezone, dateMax) );
    console.log(`OK!`);
    return true;
  }

  function checkTimeValidity(timezone, startedAt, from, to) {
    // The time range restriction must consider the charging station timezone
    // Normalize time range restrictions - both limits must be set!
    const timeFrom = moment(from || '00:00', 'HH:mm');
    const timeTo = moment(to || '00:00', 'HH:mm');
    // Normalize limits for the current timezone
    const dateMin = moment().tz(timezone).set({ hour: timeFrom.get('hour'), minute: timeFrom.get('minute') });
    const dateMax = moment().tz(timezone).set({ hour: timeTo.get('hour'), minute: timeTo.get('minute') });
    // Regular time range or not?
    const spanTwoDays = timeTo.isBefore(timeFrom);
    const consumptionStartDate = moment(startedAt).tz(timezone);
    if (spanTwoDays) {
      // Time range spanning two days - e.g.: - Time range from 20:00 to 08:00
      const dateMaxNextDay = dateMax.add(1, 'days')
      dump('Consumption Date', consumptionStartDate);
      dump('dateMin: ', dateMin);
      dump('dateMax+1: ', dateMaxNextDay);
      console.log('isSameOrAfter: ' + consumptionStartDate.isSameOrAfter(dateMin));
      console.log('isBefore: ' + consumptionStartDate.isBefore(dateMaxNextDay));
      return consumptionStartDate.isSameOrAfter(dateMin) && consumptionStartDate.isBefore(dateMaxNextDay);
    }
    // Regular time range - e.g.: - Time range from 08:00 to 20:00
    return consumptionStartDate.isSameOrAfter(dateMin) && consumptionStartDate.isBefore(dateMax);
  }

  function dump( text, aDate ) {
    console.log(text + aDate.format('LL') + ':' + aDate.format('LT'));
  }

  //var moment = require('moment')
  var moment =require('moment-timezone');
  
  const timezone = "America/New_York";
  console.log(moment().tz(timezone).format('YYYY-MM-DD HH:mm'));

  // console.log(checkTimeValidity(timezone, moment(), '23:00', '01:00'));
  console.log('-------------------------------');
  console.log('Expecting TRUE');
  console.log('-------------------------------');
  console.log(checkTimeValidity(timezone, moment(), '07:00', '10:00'));
  console.log(checkTimeValidity(timezone, moment(), '12:00', '10:00'));
  console.log(checkTimeValidity(timezone, moment(), '23:00', '10:00'));
  console.log(checkTimeValidity(timezone, moment(), '00:00', '10:00'));

  console.log('-------------------------------');
  console.log('Expecting FALSE');
  console.log('-------------------------------');
  console.log(checkTimeValidity(timezone, moment(), '09:00', '00:00'));
  console.log(checkTimeValidity(timezone, moment(), '09:00', '07:00'));
  console.log(checkTimeValidity(timezone, moment(), '00:00', '07:00'));

})();