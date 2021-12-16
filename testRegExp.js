const env = require("dotenv").config({ path: "./.env" });

(async () => {
  console.log('Hello!');

  const chargingStation = {
    "chargeBoxSerialNumber": "EVB1A22P4RI3N212842300200"
  }

  const filterValue = 'EVB1A22P4RI|EVB1A22P4ERI';
  const filter = 'chargeBoxSerialNumber';
  if ( new RegExp(filterValue).test(chargingStation[filter])) {
    console.log('OK');
  } else {
    console.log('Ko');
  }
   
})();