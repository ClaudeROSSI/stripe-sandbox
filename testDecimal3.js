(async () => {

    var  Decimal = require("decimal.js");
    
    const price = 1;
    const minutes = 60;
    const consumptionWh = 1000;
    let xxx = new Decimal(1.3);
    console.log("xxx = " + xxx.toJSON());
    console.log("xxx = " + JSON.stringify(xxx));

    const consumptionPerMinutes = new Decimal(consumptionWh).div(minutes).div(1000);
    const pricePerMinutes = new Decimal(consumptionPerMinutes).mul(price);
    let totalPriceAsDecimal = new Decimal(0);
    let totalPrice = 0;
    let totalPriceStringified = new Decimal(0).toJSON();

    for (let i = 0; i < minutes; i++) {
        totalPriceAsDecimal = totalPriceAsDecimal.add(consumptionPerMinutes.toNumber());
        totalPrice = new Decimal(totalPrice).add(consumptionPerMinutes.toNumber()).toNumber();
        totalPriceStringified = new Decimal(totalPriceStringified).add(consumptionPerMinutes.toNumber()).toNumber();
    }

    console.log("------------------------------------------------");
    console.log("consumptionPerMinutes = " + consumptionPerMinutes.toNumber());
    console.log("pricePerMinutes = " + pricePerMinutes.toNumber());
    console.log("totalPrice = " + new Decimal(pricePerMinutes).mul(minutes).toNumber());
    console.log("totalPriceAsDecimal = " + totalPriceAsDecimal.toNumber());
    console.log("totalPrice = " + totalPrice);
    console.log("totalPriceStringified = " + new Decimal(totalPriceStringified).toNumber());
    console.log("------------------------------------------------");
})();
