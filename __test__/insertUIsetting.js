var modeles = require('../server/models');
var UIsettings = modeles.UIsettings;
var datas = require('./UIsettingsinsert.json').data;

// datas.map(function(obj){
//   UIsettings.create(obj).then(function(task){
//     task.save();
//   });
// })

UIsettings.bulkCreate(datas).then(function() { 
  return UIsettings.findAll();
}).then(function(settings) {
  console.log(settings);
})
