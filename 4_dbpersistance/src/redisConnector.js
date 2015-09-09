var Promise = require("bluebird"),
    Flatten = require("./flatten");
    redis = require('promise-redis')(function (resolver) {
        return new Promise(resolver);
    });

function RedisConnector() {
    // redis is the usual node_redis object. Do what you usually do with it:
    this.client = redis.createClient();
    this.client.on("error", function (err) {
        console.log("Buu, se rompio. Razón:", err);
    });
}

RedisConnector.prototype = {
    persist: function (id, obj) {
        this.client.set(id, JSON.stringify(obj))
            .then(console.log)
            .catch(console.log);
    },

    retrieve: function (id, callback) {
        var flatten = new Flatten();
        return this.client.get(id)
            .then(function(res) {
                var obj = flatten.unflatten(JSON.parse(res));
                callback(obj);
            })
            .catch(console.log);
    }

};

module.exports = RedisConnector;