var assert = require("assert");
var Flatten = require("../src/flatten");

describe("Flatten", function () {
    it("Flattenizando un objeto", function (done) {
        var flattenizer = new Flatten();
        var obj = {
            cons: [['some', 'somemore']],
            bleh: 21
        };

        var result = flattenizer.flatten(obj);

        var expects = { 'cons.0.0': 'some', 'cons.0.1': 'somemore', bleh: 21 };
        assert.deepEqual(result, expects);
        done();
    });

    it("DesFlattenizando un objeto", function (done) {
        var flattenizer = new Flatten();
        var obj = {
            cons: [['some', 'somemore']],
            bleh: 21
        };

        var init = { 'cons.0.0': 'some', 'cons.0.1': 'somemore', bleh: 21 };
        var result = flattenizer.unflatten(init);
        assert.deepEqual(result, obj);
        done();
    });
});