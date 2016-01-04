var Tree = require('./Tree.js');
var _ = require('lodash');
var tree;
var i =1;
var data;
module.exports = {
  init:init
};
function init(data){
  var tree = new Tree();
  data = data;
  var rootArray = _.sortBy(_.filter(data,{type:'root'}),'order');
  rootArray.map(function(root){
    tree.add(root,'project',tree.traverseDF,'item');
    addChild(root,data);
  })
  return tree;
}

function addChild(root,data){
  var childArray = _.sortBy(_.filter(data,{parent:root.id}),'order');
  if(childArray.length!=0){
    childArray.map(function(child){
       tree.add(child,root.id,tree.traverseDF,'id');
       addChild(child,data);
     });
  }
  i++;
}
