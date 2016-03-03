var ItemService = require('../server/service/ItemService');
const models = require('../server/models');
const WorkItem = models.WorkItem;

var workItem = WorkItem.build();

WorkItem.find({where:{id:18}}).then(function(data){
  var workItem = data.get();

  ItemService.workitemToProjectItemSave({workItem:workItem,ProjectId:1,parentId:1,order:0},function(result){
     console.log(result)
  })
})
