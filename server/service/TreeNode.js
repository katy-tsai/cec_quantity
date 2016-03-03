var Node =function(data){
  this.data = data;
  this.parent = null;
  this.isOpen = data.isOpen||false;
  this.children = [];
}

module.exports = Node;
