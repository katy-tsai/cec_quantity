const modeles = require('../server/models');
const WorkItemMapping = modeles.WorkItemMapping;
var entity = {
  item:'鋼板樁租金  W=      cm    L=      m',
  code:'91040100',
  unit:'支',
  contractPrice:500,
  id:1,
  WorkItemId:18,
  order:0,
  hasChild:'N',
  type:'root'
}
var entity2 = {
  item:'標板放樣',
  code:'91000100',
  unit:'㎡',
  contractPrice:100,
  WorkItemId:18,
  id:2,
  order:1,
  hasChild:'N',
  type:'root'
}

//  WorkItemMapping.sync({force:true}).then(function(){
//   console.log('success')
// })

var workItemMapping = WorkItemMapping.build();
//
// workItemMapping.createOrUpdate(entity,function(result){
//   console.log(result)
// },function(err){
//   console.log(err)
// })

// workItemMapping.getAllByWorkItemId({WorkItemId:18},function(result){
//   console.log(result)
// },function(err){
//   console.log(err)
// })

workItemMapping.bulckDelete({ids:[47,48]},function(result){
  console.log(result)
},function(err){
  console.log(err)
})
