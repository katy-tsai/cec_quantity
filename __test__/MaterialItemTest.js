const modeles = require('../server/models');
const MaterialItem = modeles.MaterialItem;
const data = require("./MaterialItem.json").data;

 MaterialItem.sync({force:true}).then(function(){
   MaterialItem.bulkCreate(data).then(function() {
     return MaterialItem.findAll();
   }).then(function(item) {
     console.log(item);
   })
 })
