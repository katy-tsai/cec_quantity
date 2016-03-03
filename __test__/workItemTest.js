const modeles = require('../server/models');
const WorkItem = modeles.WorkItem;
const data = require("./WorkItem.json").data;

 WorkItem.sync({force:true}).then(function(){
   WorkItem.bulkCreate(data).then(function() {
     return WorkItem.findAll();
   }).then(function(item) {
     console.log(item);
   })
 })
