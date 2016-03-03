const modeles = require('../server/models');
const Project = modeles.Project;
const ProjectItems = modeles.ProjectItems;
var project = Project.build();
var entity = {
  projectCode:'abc123',
  projectName:'大大建設',
  projectAlias :'大大',
  projectLocation:'新北市',
  owners:'林大明',
  id:54
}
ProjectItems.sync({force:true});
Project.sync({force:true});
// project.createOrUpdate(entity,function(data){
//   console.log(data)
// },function(err){
//   console.log(err)
// })
