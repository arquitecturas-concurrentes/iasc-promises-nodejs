function Promise(cont) {
  this.cont = cont;
}

Promise.prototype = {
  then: function(f){
    var self = this;
    return new Promise(function(cont){
      self.cont(function(v){
        cont(f(v));
      })
    })
  },
  onResolved: function(f) {
    this.cont(f);
  }
}




function succ(x) {
  function succCPS(cont) {
    cont(x + 1);
  }
  return new Promise(succCPS);
}

module.exports = {
  succ: succ
};