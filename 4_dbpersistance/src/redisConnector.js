var Promise = require("bluebird"),
    redis = require('promise-redis')(function (resolver) {
        return new Promise(resolver);
    });

function RedisConnector() {
    // redis is the usual node_redis object. Do what you usually do with it:
    this.client = redis.createClient();
    this.client.on("error", function (err) {
        console.log("uh oh", err);
    });
}

RedisConnector.prototype = {
    persist: function (id, obj) {
        this.client.set(id, obj)
            .then(console.log)
            .catch(console.log);
    },

    retrieve: function (id, callback) {
        var self = this;
        return this.client.get(id)
            .then(callback)
            .catch(console.log);
    }

};

module.exports = RedisConnector;