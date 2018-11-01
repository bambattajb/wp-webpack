(async () => {

    const _ = await import("lodash");
    const Backbone = await import ("backbone");
    const view = require("./view.js");


    console.log(_);
    console.log(Backbone);
    new view();

})();


