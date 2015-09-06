var assert = require("assert");
var math = require("../src/math.js");

describe("promieses", function() {

  it("can implement plain functions", function(){
    var promise = math.succ(1);
    assert.equal(promise.value(), 2);
  })

  describe("can implement partial functions (failure)", function(){
    it("works on defined results", function(){
      var promise = math.inverse(2);
      assert(promise.isFulfilled());
      assert.equal(promise.value(), 0.5);
    });
    it("works on undefined defined results", function(){
      var promise = math.inverse(0);
      assert(promise.isRejected());
      assert.equal(promise.reason(), undefined);
    })
  })

})