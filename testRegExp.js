const env = require("dotenv").config({ path: "./.env" });

(async () => {

  function isLoggedFromUserDevice(req) {
    const userAgent = req.useragent;
    return userAgent.isMobile || userAgent.isDesktop || isReactNative(userAgent);
  }

  function isReactNative(userAgent) {
    if (userAgent.platform === 'unknown' && userAgent.os === 'unknown') {
      if (/okhttp|android|darwin/i.test(userAgent.source)) {
        // Detect REACT NATIVE APP (ANDROID)- user agent properly set
        return true;
      }
      // Trace API USER login attempts from unknown platform/os - could be POSTMAN or anything else
      // void Logging.logWarning({
      //   tenantID: Constants.DEFAULT_TENANT_ID,
      //   module: MODULE_NAME, method: 'isLoggedFromUserDevice',
      //   action: ServerAction.LOGIN,
      //   message: 'User Agent: ' + userAgent.source,
      //   detailedMessages: { userAgent }
      // });
    }
    return false;
  }

  console.log('Hello!');

  // const chargingStation = {
  //   "chargeBoxSerialNumber": "EVB1A22P4RI3N212842300200"
  // }

  // const filterValue = 'EVB1A22P4RI|EVB1A22P4ERI';
  // const filter = 'chargeBoxSerialNumber';
  // if ( new RegExp(filterValue).test(chargingStation[filter])) {
  //   console.log('OK');
  // } else {
  //   console.log('Ko');
  // }

  const request = {
    useragent: {
      os: 'unknown',
      platform: 'unknown',
      source: "okchttpAppName/1.6 CFNetwork/485.13.9 anxdroidDxaRwin/11.0.0"
    }
  };


  if ( isLoggedFromUserDevice(request) ) {
    console.log('OK');
  } else {
    console.log('Ko');    
  }
  // if (/darwin/i.test(userAgent.source)) {
  //   console.log('OK');
  // } else {
  //   console.log('Ko');
  // }

})();