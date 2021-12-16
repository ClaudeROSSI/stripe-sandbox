(async () => {

    var  Decimal = require("decimal.js");
    var v0 = 19.49
    console.log("19.49 ==> truncated: "+  Math.trunc(v0 * 100) / 100);;
    console.log("19.49 ==> truncated: "+  new Decimal(v0).times(100).trunc().div(100).toNumber());

    // var v1 = 1.5;
    // var v2 = 13.87;
    // console.log("v1 " + v1);
    // var total = v1 + v2;
    // let x = new Decimal(0);

    // x = x.plus(v1);
    // x = x.plus(v2);


    // if ( x.equals(total)) {
    //     console.log("ok");
    // } else {
    //     console.log("!!!!!!!!!KO");
    // }
  
})();
