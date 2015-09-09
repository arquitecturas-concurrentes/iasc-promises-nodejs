var assert = require("assert");
var redisConnector = require("../src/redisConnector");

describe("Redis Connector", function() {
    it("usar la api de redis con promises", function(done) {
        var client = new redisConnector();
        var content = "bleh"

        client.persist('1', content);
        client.retrieve('1', function(result){
            assert.equal(result, content);
        });
        done();
    });

    it("Persisto un objeto simple", function(done){
        var obj = {"bleh" : 1};
        var client = new redisConnector();

        client.persist('1', obj);
        client.retrieve('1', function(result) {
           assert.deepEqual(result, obj);
        });
        done();
    });

});