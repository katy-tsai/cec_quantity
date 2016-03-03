module.exports = function(sequelize,DataTypes){
  var WorkItemMapping =sequelize.define('WorkItemMapping',{
    item:DataTypes.STRING(180),
    code:DataTypes.STRING(10),
    unit:DataTypes.STRING(5),
    contractPrice:DataTypes.FLOAT(19,0),
    order:DataTypes.INTEGER,
    hasChild:DataTypes.STRING(1),
    type:DataTypes.STRING(10),
    state:{
      type:DataTypes.STRING(1),
      defaultValue:'Y'
    }
  },
   {tableName: 'workItemMapping',
   instanceMethods:{
     getAll:function(entity,onSuccess,onError){
       WorkItemMapping.findAll({where:entity}).then(onSuccess).catch(onError);
     },
     bulckDelete:function(entity,onSuccess,onError){
       var ids = entity.ids;
       WorkItemMapping.destroy({where:{
         id:{
           $in:ids
         }
       }}).then(onSuccess).catch(onError);
     },
     getAllByWorkItemId:function(entity,onSuccess,onError){
      var WorkItemId = entity.WorkItemId;
      WorkItemMapping.findAll({where:{
        WorkItemId:WorkItemId
      },order:'`order`'}).then(onSuccess).catch(onError);
    },
    getByWorkItemId:function(entity){
     var WorkItemId = entity.WorkItemId;
     return WorkItemMapping.findAll({where:{
       WorkItemId:WorkItemId
     },order:'`order`'});
   },
     createOrUpdate:function(entity,onSuccess,onError){
       for(var key in entity) {
           if(entity.hasOwnProperty(key)) {
             if(!entity[key]&&entity[key]==''){
               delete entity[key];
             }
           }
       }
       console.log('createOrUpdate entity = ',entity);
        if(entity.id!=null){
          WorkItemMapping.update(entity,{where:{id:entity.id}}).then(function(){
             return WorkItemMapping.findById(entity.id);
          }).then(onSuccess).catch(onError);
        }else{
          return WorkItemMapping.create(entity).then(onSuccess).catch(onError);
        }
      }
   }
   })

  return WorkItemMapping;
}
