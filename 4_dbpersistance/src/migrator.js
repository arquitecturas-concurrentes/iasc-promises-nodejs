var Promise = require('bluebird');
var uuid = require('node-uuid');
var Flattener = require('./flatten');
var RedisConnector = require('./redisConnector');

function Migrator() {
    this.connector = new RedisConnector();
    this._map = {};
    this.flatenner = new Flattener;
}

Migrator.prototype = {

    export: function (obj) {
        var id = uuid.v4();
        this.persist(id, obj);
        return id;
    },

    import: function (id) {
        this.exists(id).then(function () {
            return this.retrieve(id);
        });
    },

    persist: function (id, obj) {
        var flattened = this.flatenner.flatten(obj);
        this._map[id] = flattened;
        this.connector.persist(id, flattened);
    },

    exists: function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self._map.hasOwnProperty(id) ? resolve() : reject();
        });
    },

    retrieve: function (id, callback) {
        this.connector.retrieve(id, callback);
    }
};

module.exports = Migrator;