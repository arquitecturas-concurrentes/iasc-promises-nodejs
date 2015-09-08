var assert = require("assert");
var math = require("../src/math.js");

describe("promieses", function() {

  it("can implement plain functions", function(){
    var promise = math.succ(1);
    assert(promise.isResolved());
    assert.equal(promise.resolvedValue(), 2);
  })
})