var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('Examples', function() {
    it('should run all examples without throwing an exception', function() {
        var deepRequire = function(fromPath) {
            fs.readdirSync(fromPath).forEach(function(file) {
                var fileFullPath = path.join(fromPath, file);

                var stats = fs.statSync(fileFullPath);

                if (stats.isDirectory()) {
                    deepRequire(fileFullPath);
                } else if (fileFullPath.indexOf('.js', this.length - 3) !== -1) {
                    require(fileFullPath);
                }
            });
        };

        // Disable console.log
        var consoleLog = console.log;
        console.log = function() { }

        assert.doesNotThrow(function() {
            deepRequire(path.join(__dirname, '/../examples'));
        });

        // Enable the log again
        console.log = consoleLog;
    });
});