module.exports = function(sequelize,DataTypes){
  var ProjectItems =sequelize.define('ProjectItems',{
    item:DataTypes.STRING(180),
    code:DataTypes.STRING(10),
    unit:DataTypes.STRING(5),
    contractNum:DataTypes.FLOAT(19,3),
    contractPrice:DataTypes.FLOAT(19,2),
    contractCheckPrice:DataTypes.FLOAT(19,0),
    contractRate:DataTypes.FLOAT(19,3),
    executeNum:DataTypes.FLOAT(19,3),
    executePrice:DataTypes.FLOAT(19,2),
    executeCheckPrice:DataTypes.FLOAT(19,0),
    executeRate:DataTypes.FLOAT(19,3),
    note:DataTypes.STRING(180),
    firm:DataTypes.STRING(180),
    executeCompany:DataTypes.STRING(5),
    order:DataTypes.INTEGER,
    type:DataTypes.STRING(10),
    workMappingId:DataTypes.INTEGER
  },
   {tableName: 'projectItems',
   instanceMethods:{

     getAll:function(entity,onSuccess,onError){
       ProjectItems.findAll().then(onSuccess).catch(onError);
     },
     getAllByProjectId:function(entity,onSuccess,onError){
      var projectId = entity.ProjectId;
      ProjectItems.findAll({where:{
        ProjectId:projectId
      },order:'`order`'}).then(onSuccess).catch(onError);
    },
     delete:function(entity,onSuccess,onError){
       var id = entity.id;
       ProjectItems.destroy({where:{
         id:id
       }}).then(onSuccess).catch(onError);
     },
    
     createOrUpdate:function(entity,onSuccess,onError){
       for(var key in entity) {
           if(entity.hasOwnProperty(key)) {
             if(!entity[key]&&entity[key]==''){
               if(!(key=='order'&&entity['order']==0)){
                    delete entity[key];
               }
             }
           }
       }
        if(entity.id!=null){
          ProjectItems.update(entity,{where:{id:entity.id}}).then(function(){
             return ProjectItems.findById(entity.id);
          }).then(onSuccess).catch(onError);
        }else{
          return ProjectItems.create(entity).then(onSuccess).catch(onError);
        }
      },
      bulkcrud:function(entity){
        for(var key in entity) {
            if(entity.hasOwnProperty(key)) {
              if(!entity[key]&&entity[key]==''){
                if(!(key=='order'&&entity['order']==0)){
                     delete entity[key];
                }
              }
            }
        }
        if(entity.id!=null){
          return ProjectItems.update(entity,{where:{id:entity.id}}).then(function(){
            return ProjectItems.findById(entity.id);
          });
        }else{
          return ProjectItems.create(entity);
        }
      },
      bulkDestroy:function(ids){
        return ProjectItems.destroy({where:{ id:ids}});
      }
   }


  })

  return ProjectItems;
}
