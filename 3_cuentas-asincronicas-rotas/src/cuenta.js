var Promise = require('bluebird');

function randomDelay() {
  //return Promise.delay(Math.random() * 500);
  return Promise.resolve();
}

function Cuenta(saldo) {
  this._saldo = saldo;
}

Cuenta.prototype = {
  puedeExtraer: function(_saldo) {
    var self = this;
    return randomDelay().then(function() {
      return self._saldo >= _saldo;
    });
  },
  extraer: function(_monto) {
    var self = this;
    return randomDelay().then(function(){
      return new Promise(function(resolve, reject){
        if(self._saldo < _monto) {
          reject()
        } else {
          self._saldo -= _monto;
          resolve();
        }
      });
    })
  },
  depositar: function(_monto) {
    var self = this;
    return randomDelay().then(function() {
      self._saldo += _monto;
    });
  },
  saldo: function () {
    var self = this;
    return randomDelay().then(function() {
      return self._saldo;
    });
  }
}

module.exports = Cuenta;

