function Promise(cont) {
  this.cont = cont;
}

Promise.prototype = {
  
  map: function(mapper) {
    return this._derive(function(value, cont) {
        cont(mapper(value));
    });
  },

  flatMap: function(flatMapper) {
    return this._derive(function(value, cont) {
        var promise = flatMapper(value);
        promise.onResolved(cont);
    });
  },

  _derive: function(derived) {
    var originalCont = this.cont;
    return new Promise(function(cont){
      originalCont(function(value) {
        derived(value, cont);
      });
    });
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