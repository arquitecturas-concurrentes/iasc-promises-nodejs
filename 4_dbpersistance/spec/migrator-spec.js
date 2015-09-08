var assert = require("assert");
var Migrator = require("../src/migrator");

describe("Migrator", function() {
    it("Migrate value", function(done) {
        var migrator = new Migrator('redis');
        var obj = {"bleh" : 1};

        migrator.export(obj);
        done();
    });


});