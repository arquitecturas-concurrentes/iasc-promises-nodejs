var assert = require("assert");

var Transferencia = require("../src/transferencia");
var Cuenta = require("../src/cuenta");
var Promise = require("bluebird");

describe("Transferencia", function() {
  it("incrementa el destino y decrementa el origen", function(done) {
    var origen = new Cuenta(100);
    var destino = new Cuenta(100);

    var resultadosTransferencias = [
      new Transferencia(origen, destino, 30) /*,
      new Transferencia(origen, destino, 40),
      new Transferencia(origen, destino, 10),
      new Transferencia(origen, destino, 50),
      new Transferencia(destino, origen, 10),
      new Transferencia(destino, origen, 20)*/
       ].map(function(it){
        return it.ejecutar();
      });

    Promise
      .all(resultadosTransferencias)
      .then(function() {
        console.log('tesing0')
        return Promise.all([origen.saldo(), destino.saldo().tap(function(s){

        console.log('tesing1' + s);
        console.log('tesing1' + JSON.stringify(destino));

        })])
      })
      .tap(function(saldos) {
        console.log('tesing' + JSON.stringify(origen));
        console.log('tesing' + JSON.stringify(destino));
        assert.deepEqual(saldos, [50, 150]);
      })
      .finally(function(){
        done();
      });
  })
});