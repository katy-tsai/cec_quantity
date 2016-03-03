var Sequelize = require('Sequelize');

var sequelize = new Sequelize('cecDB','root','admin',{
  timezone: '+08:00',
  host:'localhost',
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:10000
  }
});

var models = [
  'UIsettings',
  'Project',
  'ProjectItems',
  'CategoriesCode',
  'WorkItem',
  'WorkItemMapping',
  'MaterialItem'
];

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname+'/'+model)
});

(function(m){
  m.Project.hasMany(m.ProjectItems);
  m.ProjectItems.belongsTo(m.Project);
  m.ProjectItems.belongsTo(m.ProjectItems,{foreignKey:'parent'});
  m.WorkItem.hasMany(m.WorkItemMapping);
  m.WorkItemMapping.belongsTo(m.WorkItem);
  m.WorkItemMapping.belongsTo(m.WorkItemMapping,{foreignKey:'parent'});
})(module.exports);

sequelize.sync();
module.exports.sequelize = sequelize;
