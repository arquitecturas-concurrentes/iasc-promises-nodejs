function Transferencia(origen, destino, monto) {
  this.origen = origen;
  this.destino = destino;
  this.monto = monto;
}

Transferencia.prototype = {
  ejecutar: function() {
    var self = this;
    self
      .origen
      .extraer(this.monto)
      .tap(function(){
        console.log('extraidos ' + self.monto)
        console.log(' origen = ' + JSON.stringify(self.origen))
        console.log(' destino = ' + JSON.stringify(self.destino))
      })
      .then(function(){
        console.log('depositando ' + self.monto)
        console.log(' origen = ' + JSON.stringify(self.origen))
        console.log(' destino = ' + JSON.stringify(self.destino))
        return self.destino.depositar(self.monto)
      })
      .tap(function(){
        console.log('final ')
        console.log(' origen = ' + JSON.stringify(self.origen))
        console.log(' destino = ' + JSON.stringify(self.destino))

      })
      .caught(function(){
        //ignorar transferencias que fallen
      });
  }
};

module.exports = Transferencia;


