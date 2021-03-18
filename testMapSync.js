(async () => {

  function doSomething(message, data) {
    console.log(`-${message}-BEFORE----` + new Date());
    console.log(data);
    console.log(`-${message}-AFTER----`);
    return "ID: " + data.id;
  }

  async function doSomethingAsync(message, data) {
    return doSomething(message, data);
  }

  console.log('Hello - Welcome to JSONStream!');

  var JSONStream = require('JSONStream')
  var es = require('event-stream')
  var fs = require('fs');
  var filename = __dirname + '/resources/example.json';
  var readStream = fs.createReadStream(filename);
  var counter = 0;

  console.log("---------------------------------------------------------------");
  console.log("-BEGIN----");
  console.log("---------------------------------------------------------------");
  readStream.on('end', function(){
    console.log("-STREAM END----" + counter);
  })    
  
  readStream.on('data', function(data){
    console.log("*STREAM DATA BEGIN****");
    console.log(data);
    console.log("*STREAM DATA END****");
  })

  const jsonParser = JSONStream.parse('rows.*');

  jsonParser.on('data', function(data){
    // doSomethingAsync("ASYNC-onJsonParser-DATA", data).then( (result) => {
    //   console.log("*ASYNC-onJsonParser-DATA-COMPLETED**** == "+result);
    //   counter++;
    //  });
 })

  readStream
  .pipe(jsonParser)
  .pipe(es.map((data, callback) => {
    doSomethingAsync("ES.MAP", data).then( (result) => {
      console.log("*ES.MAP-COMPLETED**** == "+result);
      counter++;
      callback(null, data);
    });
  }))


  console.log("---------------------------------------------------------------");
  console.log("-END----" + counter);
  console.log("---------------------------------------------------------------");
  

})();