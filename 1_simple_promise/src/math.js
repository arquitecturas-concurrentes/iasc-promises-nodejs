var Promise = require('bluebird');

function succ(x) {
  var deferred = Promise.pending();
  deferred.resolve(x + 1);
  return deferred.promise;
}

function inverse(x) {
  var deferred = Promise.pending();
  if (x === 0) {
    deferred.reject();
  } else {
    deferred.resolve(1 / x);
  }
  return deferred.promise;
}


module.exports = {
  succ: succ,
  inverse: inverse
};