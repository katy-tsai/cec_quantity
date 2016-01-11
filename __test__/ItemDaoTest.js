const modeles = require('../server/models');
const Project = modeles.Project;
const ProjectItems = modeles.ProjectItems;
const ItemsDao = require('../server/router/ItemsDao');


ItemsDao.getTreeItems(1,function(tree){
   console.log( tree._root.children);
  var selectNode = tree._root.children[0];
    var data = {
      "item":"node-123",
      "hasChild":"N",
      "order":"1",
      "type":"node",
      "ProjectId":1,
      "parent":selectNode.data.id
    }
    //add (子節點，母節點attr，tree.traverseDF,attr)
    tree.add(data,selectNode.data.id,tree.traverseDF,"id");
    // var deletNote = selectNode.children[0];
    // //remove(子節點attr，母節點attr，tree.traverseDF,attr)
    // tree.remove(deletNote.data.id,selectNode.data.id,tree.traverseDF,"id");

    ItemsDao.crudTree(tree,1,function(result){
      console.log(result)
    })


});
