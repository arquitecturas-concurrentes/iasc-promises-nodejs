function Deferred() {}

Deferred.prototype = {
  resolve: function(value) {
    this.resolvedValue = value;
  },
  promise: function() {
    return new MyPromise(this.resolvedValue);
  }
}

function MyPromise(resolvedValue) {
  this._resolvedValue = resolvedValue;
}

MyPromise.prototype = {
  resolvedValue: function() {
    return this._resolvedValue;
  },
  isResolved: function(){
    return true;
  }
}


function succ(x) {
  var deferred = new Deferred();
  deferred.resolve(x + 1);
  return deferred.promise();
}

module.exports = {
  succ: succ
};