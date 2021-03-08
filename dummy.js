const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function doSomething(value) {
    console.log("---------");
    console.log("Value:" + value);

    return doSomethingElse(value + " - something else");
};

async function doSomethingElse(value) {
    console.log("Value:" + value);
    return value;
};

(async () => {

    console.log('Dummy tests!');
    
    let text = "cas1";
    void doSomething("call 1 - "+ text);
    
    text = "cas2";
    console.log ( "Result " + await doSomething("call 2 - "+ text) );


    text = "cas3";
    void doSomething("call 3 - "+ text);
    await doSomething("call 3 sync - "+ text);


    text = "OK";
    doSomething("call 4 - "+ text).then( (value) => {
        console.log("Then  - " + value);   
        console.log("Then  - Text should be OK - " + text);     
    });
 
    console.log("---------");

    text = "KO"
    console.log("last call - " + text);

})();