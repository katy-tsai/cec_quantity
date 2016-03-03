const data = require('./data');
const _ = require('lodash');

var test = _.remove([1,2,3,4], function(n) {
  return n % 2 == 0;
});

var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});

console.log(test)
