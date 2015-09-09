var Benchmark = require('benchmark');

module.exports = {
    create: function(name) {
        return new Benchmark.Suite(name, {
            onStart: function() {
                console.log('Starting suite for ' + name);
            },
            onCycle: function(event) {
                console.log(String(event.target));
            },
            onComplete: function() {
                console.log('Fastest is ' + this.filter('fastest').pluck('name') + '\r\n');
            }
        });
    },
    /**
     * This is supposed to answer a question, but hopefully not start a pointless argument on how to save some ops
     * between two operations that complete several million times per second.
     * @param name
     * @param example
     * @returns {Benchmark.Suite}
     */
    question: function(name, example, editorial) {
        return new Benchmark.Suite(name, {
            onStart: function() {
                console.log('QUESTION: ' + name);
                if (example) {
                    console.log(' EXAMPLE: ' + example);
                }
            },
            onCycle: function(event) {
                console.log('          ' + String(event.target));
            },
            onComplete: function() {
                var maybe = 'Maybe';
                var fastestName = this.filter('fastest').pluck('name')[0];
                var answer = fastestName;

                var fastestNameItems = this.filter(function(item) {
                    return item.name === fastestName;
                }).length;

                var expectedIndexSumOfFastestName = 0;
                for (var offset = fastestNameItems - 1; offset >= 0; offset--) expectedIndexSumOfFastestName += offset;

                var actualIndexSumOfFastestName = this.sort(function(a, b) {
                    if (a.hz < b.hz) {
                        return 1;
                    }
                    if (a.hz > b.hz) {
                        return -1;
                    }
                    return 0;
                }).reduce(function(accumulator, item, index) {
                    return item.name === fastestName ? accumulator + index : accumulator;
                }, 0);

                if (expectedIndexSumOfFastestName !== actualIndexSumOfFastestName) {
                    answer = maybe;
                }

                console.log('  ANSWER: ' + answer);

                if (editorial) {
                    console.log('          ' + editorial);
                }

                console.log('');
            }
        });
    }
};