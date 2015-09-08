var assert = require("assert");
var math = require("../src/math.js");

describe("promieses", function() {

  it("can implement plain functions", function(done){
    math
      .succ(1)
      .then(function(value) {
        return math.succ(value);
      })
      .onResolved(function(value){
        assert.equal(promise.value(), 2);
        done();
      })
  })

})