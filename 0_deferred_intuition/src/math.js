class Deferred {

  constructor() {
    this.resolvedValue = undefined
  }

  resolve(value) {
    this.resolvedValue = value
  }

  promise() {
    return new MyPromise(this.resolvedValue)
  }
}

class MyPromise {
  constructor(resolvedValue) {
    this._resolvedValue = resolvedValue
  }

  resolvedValue() {
    return this._resolvedValue
  }

  isResolved() {
    return true
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