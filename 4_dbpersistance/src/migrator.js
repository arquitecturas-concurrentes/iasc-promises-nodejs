var Promise = require('bluebird');
var uuid = require('node-uuid');
var Flattener = require('./flatten');
var RedisConnector = require('./redisConnector');

function Migrator(dbType)
{
    this.importConnector(dbType);
    console.log(this.connector);
    this.map = {};
    this.flatenner = new Flattener;
}

Migrator.prototype = {

    getConnector: function(dbType)
    {
        var db_connectors = ['redis'];
        return new Promise(function(resolve, reject){
            if(db_connectors.indexOf(dbType) > -1)
            {
                resolve();
            }else{
                reject();
            }
        });
    },

    importConnector: function(dbType){
        var self = this;
        this.getConnector(dbType).then(function() {
            self.connector = new RedisConnector();
        });
        //this.connector = new RedisConnector();
    },

    export: function(obj)
    {
        var id = uuid.v4();
        this.persist(id, obj);
        return id;
    },

    import: function(id)
    {
        this.exists(id).then(function(){
            return this.retrieve(id);
        });
    },

    persist: function(id, obj)
    {
      var flattened = this.flatenner.flatten(obj);
      this.map[id] = flattened;
      this.connector.persist(id, flattened);
    },

    exists: function(id)
    {
        var self = this;
        return new Promise(function(resolve, reject){
            self.map.hasOwnProperty(id) ? resolve(): reject();
        });
    },

    retrieve: function(id, callback){
        this.callback = callback;
        this.connector.retrieve(id, this.response);
    },

    response: function(err, reply){
        var obj = this.flatenner.unflatten(reply);
        this.callback(obj);
    }

};

module.exports = Migrator;