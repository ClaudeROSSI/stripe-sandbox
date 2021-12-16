const env = require("dotenv").config({ path: "./.env" });

(async () => {
  console.log( 1 % 60 );
  console.log( 30 % 60 );
  console.log( 60 % 60 );
  console.log( 61 % 60 );
  console.log( 121 % 60 );
})();