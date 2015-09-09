var assert = require("assert");
var Migrator = require("../src/migrator");

describe("Migrator", function () {
    it("Migrate value", function (done) {
        var migrator = new Migrator();
        var obj = {"bleh": 1};

        var id = migrator.export(obj);
        assert.deepEqual(migrator._map[id], {"bleh": 1});

        migrator.retrieve(id, function (value) {
            assert.equal(value.hasOwnProperty("bleh"), true);
            assert.equal(value['bleh'], 1);
        });
        done();
    });


});