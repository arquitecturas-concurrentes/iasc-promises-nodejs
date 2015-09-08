var assert = require("assert");
var Cuenta = require("../src/cuenta");

describe("Cuenta", function() {
  it("depositar incrementa el saldo", function(done) {
    var cuenta = new Cuenta(100);
    cuenta
      .depositar(20)
      .then(function(){
        return cuenta.saldo()
      })
      .tap(function(saldo){
        assert.equal(saldo, 120);
      })
      .tap(function(){
        done();
      });
  });

  it("extraer decrementa el saldo", function(done) {
    var cuenta = new Cuenta(100);
    cuenta
      .extraer(20)
      .then(function() {
        return cuenta.saldo()
      })
      .tap(function(saldo){
        assert.equal(saldo, 80);
      })
      .tap(function(){
        done();
      });
  });
})