const modeles = require('../server/models');
const WorkItem = modeles.WorkItem;


 WorkItem.sync();

WorkItem.bulkCreate([
  {item:'結構',isDefault:'Y'},
  {item:'泥作',isDefault:'Y'},
  {item:'輕質牆',isDefault:'Y'}
]).then(function() {
  return WorkItem.findAll();
}).then(function(item) {

  console.log(item);
})
