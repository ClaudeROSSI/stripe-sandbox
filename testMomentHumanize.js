(async () => {

  function customTemplate() {
    if ( this.duration.asSeconds() < 60 ) {
      return  "s [second]";
    } else if ( this.duration.asSeconds() < 60 * 60 ) {
      return  "m [minute] s [second]";
    } else if ( this.duration.asSeconds() < 60 * 60 * 24 ) {
      return  "h [hour] m [minute] s [second]";
    } else if ( this.duration.asSeconds() < 60 * 60 * 24 * 7 ) {
      return  "d [day] h [hour] m [min] s [second]";
    } else {
      return  "w [week] d [day] h [hour] m [minute] s [second]";
    }
  }

  function showDuration(seconds, options) {
    console.log(moment.duration(seconds, 'seconds').format(customTemplate, options));
  }

  function showDurations(options) {
    console.log ('----------------------------------------------')
    console.log (options)
    console.log ('----------------------------------------------')
    showDuration(60, options);
    showDuration(60+1, options);
    showDuration(60*60, options);
    showDuration(60*60+60+1, options);
    showDuration(60*60*24+60*60+60+1, options);
    showDuration(60*60*24+60*60+60+1, options);
    showDuration(60*60*27+60+1, options);
    showDuration(60*60*24*8+1, options);
    showDuration(60*60*24*8+60*60+1), options;
    showDuration(60*60*24*15+60*60+60+59, options);
  }

  //    return this.duration.asSeconds() >= 86400 ? "w [weeks], d [days]" : "hh:mm:ss";
  
  //var moment = require('moment')
  var moment = require("moment-timezone");
  var momentDurationFormatSetup = require("moment-duration-format");
  momentDurationFormatSetup(moment);

  showDurations({ trim: false });
  showDurations({ trim: true });
  showDurations({ trim: 'small' });
  showDurations({ trim: 'small', forceLength: true, useToLocaleString: true });
  // showDurations({ trim: 'large' });
  // showDurations({ trim: 'mid' });
  // showDurations({ trim: 'final' });

})();