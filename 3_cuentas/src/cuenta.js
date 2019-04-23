var Promise = require('bluebird');

function randomDelay() {
  return Promise.delay(Math.random() * 500);
  //return Promise.resolve();
}

class Cuenta {
  constructor(saldo) {
    this._saldo = saldo
  };

  puedeExtraer(saldo) {
    var self = this;
    return randomDelay().then(function() {
      return self._saldo >= saldo;
    });
  };

  extraer(monto) {
    var self = this;
    return randomDelay().then(function(){
      return new Promise(function(resolve, reject){
        if(self._saldo < monto) {
          reject()
        } else {
          self._saldo -= monto;
          resolve();
        }
      });
    })
  };

  depositar(monto) {
    var self = this;
    return randomDelay().then(function() {
      self._saldo += monto;
    });
  };
  
  saldo() {
    var self = this;
    return randomDelay().then(function() {
      return self._saldo;
    });
  };
}

module.exports = Cuenta;

