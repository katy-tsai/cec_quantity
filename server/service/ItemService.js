const models = require('../models');
const _ = require('lodash');
const Project = models.Project;
const ProjectItems = models.ProjectItems;
const WorkItemMapping = models.WorkItemMapping;
const TreeData = require('../../public/util/TreeData');
const Node = require('./TreeNode');
const Q = require('q');
module.exports = {
  getProjectItems:function(entity,callback,errCallback){
    var projectItems =ProjectItems.build();
    var ProjectId = entity.ProjectId;
    projectItems.getAllByProjectId({ProjectId:ProjectId},function(results){
      var items =results.map(function(obj){
        return obj.get();
      });
      callback(items);
    },function(err){
      errCallback(err)
    })
  },

  getItemIds:function(ProjectId,callback){
      var projectItems = ProjectItems.build();
      projectItems.getAllByProjectId({ProjectId:ProjectId},function(items){
        var itemIds = _.pluck(items,'id');
        callback(itemIds);
      },function(err){
        console.log(err);
      })
  },
  getDeleteIds:function(items,ProjectId,callback){
    var newIds = _.pluck(items,'id');
    console.log(newIds)
    this.getItemIds(ProjectId,function(originalIds){
      var deleteIts = _.difference(originalIds,newIds);
      callback(deleteIts);
    })
  },
  deleteIds:function(items,ProjectId){
    var projectItems = ProjectItems.build();
    this.getDeleteIds(items,ProjectId,function(deleteIds){
      console.log('deleteIds=',deleteIds);
      if(deleteIds.length>0){
        projectItems.bulkDestroy(deleteIds);
      }
    })
  },
  bulkCreateOrUpdate:function(items,callback,errCallback){
    var promises = [];
    for(var i in items){
      var item = items[i];
      var projectItems = ProjectItems.build(item);
      promises.push(projectItems.bulkcrud(item))
    }

    Q.all(promises).then(function (results){
      var newItems=[]
      results.map(function(obj,i){
        newItems.push(obj.get());
      })
      console.log('bulkCreateOrUpdate=',newItems);
      callback(newItems) ;

    }).catch(function(err){
      errCallback(err);
    })
  },
  crud:function(entity,callback,errCallback){
    var items = entity.items;
    var projectId = entity.projectId;
    var arrdelete = _.remove(items, function(data) {
      return data.item == 'project';
    });
    this.bulkCreateOrUpdate(items,function(newItems){
      console.log(newItems.length)
      this.deleteIds(newItems,projectId);
      callback(newItems);
  }.bind(this),errCallback);

  },
  workitemToProjectItemSave:function(entity,callback){
    var workItem = entity.workItem;
    var ProjectId = entity.ProjectId;
    var parentId = entity.parentId;
    var order = entity.order;
    var projectItems = ProjectItems.build();
    var workItemId = workItem.id;
    console.log('workItemId=',workItemId)
    var item = workItem;
    item.id = null;
    item.ProjectId = ProjectId;
    item.type = 'node';
    item.parent = parentId;
    item.order = order;
    var node;
    projectItems.createOrUpdate(item,function(data){
      var node_parentId = data.id;
      node= new Node(data);
      this.getWorkItemMappingTree(workItemId,function(datas){
        this.saveNodeItems(datas,ProjectId,node_parentId,function(childs){
          node.children = childs;
            callback(node);
        });

      }.bind(this));
    }.bind(this),function(err){
      console.log(err);
    })

  },
  savaTreeNodeToItems:function(node,parentId,callback){
    var item =node;
    item.id = null;
    item.parent = parentId;
    var projectItems = ProjectItems.build();
    projectItems.createOrUpdate(item,function(data){
      callback(data);
    },function(err){
      console.log(err);
    });
  },
  handleWorkMappingToItem:function(rootArray,ProjectId,parentId,type){
    var roots = rootArray.map(function(data,i){
      var root = {};
      var obj = data.get();
      for(var index in obj) {
       if (obj.hasOwnProperty(index)) {
           var attr = obj[index];
           if(index=='item'||index=='code'||index=='unit'||index=='contractPrice'){
             root[index]=attr;
           }else if(index=='order'){
             root['order']=i;
           }
         }
      }
       root.workMappingId = obj.id;
       root.parent = parentId;
       root.type = type;
       root.ProjectId = ProjectId;
       console.log(root.order)
        return root;
    }.bind(this));
    return roots;
  },

  saveNodeItems:function(data,ProjectId,parentId,callback){
    data = data;
    var rootArray = _.filter(data,{type:'root'});
    var roots =this.handleWorkMappingToItem(rootArray,ProjectId,parentId,'leaf');

    this.bulkCreateOrUpdate(roots,function(result){
        if(result.size()>0){
          result.map(function(parent){
            var childArray = _.sortBy(_.filter(data,{parent:parent['workMappingId']}),'order');
            console.log('childArray=',childArray)
            var parentid = parent.id;
            var childs =[];
            if(childArray.length>0){
                var items =this.handleWorkMappingToItem(childArray,ProjectId,parentid,'leaf1');
                this.bulkCreateOrUpdate(items,function(childitems){
                  var childs = childitems.map(function(data){
                    return new Node(data);
                  })
                    callback(childs);

                }.bind(this),function(err){
                  console.log(err)
                })
            }

          }.bind(this));
        }

    }.bind(this),function(err){
      console.log(err)
    });


  },

  getWorkItemMappingTree:function(WorkItemId,callback){
    var workItemMapping = WorkItemMapping.build();
      console.log(WorkItemId);
    workItemMapping.getAllByWorkItemId({WorkItemId:WorkItemId},function(datas){
      // console.log(datas);
      // var tableTree = TreeData.init(datas);
      callback(datas);
    },function(err){
      console.log(err);
    })

  }
}
