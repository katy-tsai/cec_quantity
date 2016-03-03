const data = require('./data').data;
const treeData = require('../public/util/TreeData');

var tree = treeData.init(data);
var price = treeData.calculate(tree._root.children[0].children[0],'contractPrice');
console.log(price)
