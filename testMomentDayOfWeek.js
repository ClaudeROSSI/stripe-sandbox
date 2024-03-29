(async () => {


  //var moment = require('moment')
  var moment =require('moment-timezone');
  
  const today = new Date();
  console.log(`today: ${today}`);

  
  console.log(`today: ${today.getDay()}`);


  const monday = moment(today).startOf('week');
  console.log(`First day ===> ${monday.toDate()} - DAY ${monday.toDate().getDay()} - ISO ${monday.isoWeekday()} `);

  const lastday = moment(today).endOf('week');
  console.log(`Last day ===> ${moment(lastday).toDate()} - DAY ${moment(lastday).toDate().getDay()} - ISO ${lastday.isoWeekday()} `);

  console.log(`Last day ===> ${moment().format("HH:mm")}`);

  //const timezone = "Europe/Paris";
  let timezone = "America/New_York";

  const hour = 12;
  const minute = 0;

  console.log(moment().tz());

  if (moment().tz(timezone).isSameOrAfter(moment().tz(timezone).set({ hour, minute }))) {
    console.log(`IsSameOrAfter`);
  } else {
    console.log(`!!!IsSameOrAfter`);
  }

  function getDayText(dayNumber) {
    return moment.weekdays()[dayNumber];
  }

  console.log("ISO Week Day - : " + moment().isoWeekday());
  console.log("ISO Week Day - NY: " + moment().tz("Europe/Paris").isoWeekday());
  console.log("ISO Week Day - LA: " + moment().tz("America/New_York").isoWeekday());
  console.log("ISO Week Day - WALLIS : " + moment().tz("Pacific/Wallis").isoWeekday());
  

  // moment.locale('fr');
  console.log("WEEKDAYS: " + moment.weekdays());
  console.log("WEEKDAYS: (SHORT)" + moment.weekdaysShort());
  console.log("WEEKDAYS: (MIN)" + moment.weekdaysMin());

  // moment.weekdays()
  console.log("isoWeekday() - " + moment().isoWeekday());
  console.log("isoWeekday(0) - " + moment().isoWeekday(0));
  console.log(("Today: " + getDayText(moment().isoWeekday())));
  console.log("Day 0 - " + getDayText(moment().isoWeekday(0).day()));
  console.log("Day 7 - " + getDayText(moment().isoWeekday(7).day()));

  console.log(getDayText(0));
  console.log(getDayText(7));

  console.log(1%7);
  console.log(7%7);
  console.log(0%7);

  moment.locale("en-AU");

  var ld = moment.localeData();
  console.log(ld.longDateFormat('LT'));
  console.log(ld.longDateFormat('LL'));


  timezone = "Etc/GMT-6";
  console.log('----------------------------------------------------------');
  console.log(moment().toLocaleString());
  console.log(moment().toISOString());
  console.log(moment().format("LT"));
  console.log(moment().format("LL"));

  console.log('----------------------------------------------------------');
  console.log(moment().tz(timezone).toLocaleString());
  console.log(moment().tz(timezone).toISOString());
  console.log(moment().tz(timezone).format("LT"));
  console.log(moment().tz(timezone).format("LL"));

  console.log('----------------------------------------------------------');
  console.log(moment().add(2, 'hours').tz(timezone).toLocaleString());
  console.log(moment().add(2, 'hours').tz(timezone).toISOString());
  console.log(moment().add(2, 'hours').tz(timezone).format("LT"));
  console.log(moment().add(2, 'hours').tz(timezone).format("LL"));

  console.log('----------------------------------------------------------');
  console.log(moment().add(-2, 'hours').tz(timezone).toLocaleString());
  console.log(moment().add(-2, 'hours').tz(timezone).toISOString());
  console.log(moment().add(-2, 'hours').tz(timezone).format("LT"));
  console.log(moment().add(-2, 'hours').tz(timezone).format("LL"));

  console.log('----------------------------------------------------------');
  console.log("ISO Week Day: " + moment().isoWeekday());
  console.log("ISO Week Day - " + timezone + " - " + moment().tz(timezone).isoWeekday());
  console.log("ISO Week Day - " + timezone + " - " + moment().add(-2, 'hours').tz(timezone).isoWeekday());



})();