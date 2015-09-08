var assert = require("assert");
var redisConnector = require("../src/redisConnector");

describe("Redis Connector", function() {
    it("usar la api de redis con promises", function(done) {
        var client = new redisConnector();
        var content = "bleh"

        client.persist('1', content);
        client.retrieve('1', function(result){
            console.log('Recibi '+result);
            assert.equal(result, content);
        });
        done();
    });

});