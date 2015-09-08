var assert = require("assert");
var math = require("../src/math.js");

describe("promieses", function() {

  it("can implement functions", function(done){
    math
      .succ(1)
      .onResolved(function(value){
        assert.equal(value, 2);
        done();
      })
  })


  it("can be mapped", function(done){
    math
      .succ(1)
      .map(function(value) {
        return (value * 2);
      })
      .onResolved(function(value){
        assert.equal(value, 4);
        done();
      })
  })


  it("can be flatMapped", function(done){
    math
      .succ(1)
      .flatMap(function(value) {
        return math.succ(value);
      })
      .onResolved(function(value){
        assert.equal(value, 3);
        done();
      })
  })
})