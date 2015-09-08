function Transferencia(origen, destino, monto) {
  this.origen = origen;
  this.destino = destino;
  this.monto = monto;
}

Transferencia.prototype = {
  ejecutar: function() {
    var self = this;
    return self
      .origen
      .extraer(this.monto)
      .then(function(){
        return self.destino.depositar(self.monto)
      })
      .caught(function(){
        //ignorar transferencias que fallen
      });
  }
};

module.exports = Transferencia;


