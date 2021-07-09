(async () => {

  function doSomething() {

    const usersSite = new Map();

    usersSite.set("1", [ "Un" ]);
    usersSite.set("2", [ "Un", "Deux" ]);

    console.log("---------------------------------------------------------------");
    // console.log(Object.keys(usersSite));
    // console.log(usersSite.keys());
    // console.log(usersSite.keys().includes("1"));
    // console.log(Object.keys(usersSite).includes("2"));
    // console.log(Object.keys(usersSite).includes("3"));
    console.log("---------------------------------------------------------------");
    console.log("---------------------------------------------------------------");
    console.log(usersSite.get("1")[0]);
    console.log(usersSite.get("2")[1]);
    console.log(usersSite.get("3"));
    console.log("---------------------------------------------------------------");
  }

  doSomething();

})();