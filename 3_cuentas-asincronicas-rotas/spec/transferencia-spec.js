var assert = require("assert");
var _      = require("lodash");

var Transferencia = require("../src/transferencia");
var Cuenta = require("../src/cuenta");
var Promise = require("bluebird");

describe("Transferencia", function() {
  it("incrementa el destino y decrementa el origen", function(done) {
    var origen = new Cuenta(100);
    var destino = new Cuenta(100);

    var resultadosTransferencias = [
      new Transferencia(destino, origen, 20),
      new Transferencia(origen, destino, 110),
      new Transferencia(origen, destino, 110),
      new Transferencia(destino, origen, 200),
      new Transferencia(destino, origen, 100),
      new Transferencia(origen, destino, 80)
       ].map(function(it){
        return it.ejecutar();
      });

    Promise
      .all(resultadosTransferencias)
      .then(function() {
        return Promise.all([origen.saldo(), destino.saldo()])
      })
      .then(function(saldos) {
        //assert.deepEqual(saldos, [10, 190]);
        //assert.deepEqual(saldos, [120, 80]);
        //assert.deepEqual(saldos, [40, 160]);
        assert.deepEqual(_.sum(saldos), 200);

      })
      .then(function(){
        done();
      }).caught(function(e){
        done(e)
      });
  })
});