(async () => {

    function computePrice(consumptionWh, price) {
        const amount = consumptionWh * price / 1000;
        // const amount = consumptionWh * price;
        console.log( `computing: ${consumptionWh} * ${price} / 1000 === ${amount}`  )
        return amount;
    }

    function cumulate(total, pricedConsumption) {
        const sum = total + pricedConsumption;
        console.log(`Sum: ${total} + ${pricedConsumption} = ${sum}`);
        return sum;
    }

    function computePriceAsDecimal(consumptionWh, price) {
        const amount = new Decimal(consumptionWh).times(price).div(1000).toNumber();
        // const amount = new Decimal(consumptionWh).times(price).toNumber();
        console.log( `computing: ${consumptionWh} * ${price} / 1000 === ${amount}` )
        return amount;
    }

    function cumulateAsDecimal(total, pricedConsumption) {
        const sum = new Decimal(total).plus(pricedConsumption).toNumber();
        console.log(`Sum: ${total} + ${pricedConsumption} = ${sum}`);
        return sum;
    }

    var  Decimal = require("decimal.js");
    const consumptions = [ 0, 213, 266, 255, 363, 368, 1929 ];
    const price = 2;

    const total =  consumptions.reduce( (previousValue, currentValue) => cumulate(previousValue, computePrice ( currentValue, price )) );
    console.log("------------------------------------------------");
    console.log("Total (without Decimal.js) = "+  total);
    console.log("------------------------------------------------");

    const totalAsDecimal =  consumptions.reduce( (previousValue, currentValue) => cumulateAsDecimal(previousValue, computePriceAsDecimal ( currentValue, price )) );
    console.log("------------------------------------------------");
    console.log("Total (with Decimal.js) = "+  totalAsDecimal);
    console.log("------------------------------------------------");
})();
