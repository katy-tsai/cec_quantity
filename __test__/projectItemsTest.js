const modeles = require('../server/models');
const Project = modeles.Project;
const ProjectItems = modeles.ProjectItems;

var db = require('Sequelize');

var projectItem1 = {

  "item":"ddaaa",
  "hasChild":"N",
  "order":0,
  "type":"root",
  "ProjectId":8
}

var projectItem2 = {
  "id":80,
  "item":"test2",
  "hasChild":"N",
  "order":1,
  "type":"root",
  "ProjectId":8
}

// var items = [projectItem1,projectItem2];
// var projectItems = ProjectItems.build(projectItem1);
// projectItems.bulkCUd(items,function(item){
//   console.log(item)
// },function(err){
//   console.log(err);
// })
var projectItems = ProjectItems.build();
projectItems.getAllByProjectId({ProjectId:2},function(objs){
  console.log(objs)
})

// projectItems.createOrUpdate(projectItem1,function(item){
//   console.log(item.get());
// },function(err){
//   console.log(err);
// })
