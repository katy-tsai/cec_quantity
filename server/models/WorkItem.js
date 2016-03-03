module.exports = function(sequelize,DataTypes){
  var WorkItem =sequelize.define('WorkItem',{
    item:DataTypes.STRING(180),
    code:DataTypes.STRING(10),
    unit:DataTypes.STRING(5),
    firm:DataTypes.STRING(180),
    contractPrice:DataTypes.FLOAT(19,0),
    hasChild:{
      type:DataTypes.STRING(1),
      defaultValue:'N'
    },
    state:{
      type:DataTypes.STRING(1),
      defaultValue:'Y'
    }
  },
   {tableName: 'workItem',
   instanceMethods:{
     getByCategoriesCode:function(entity,onSuccess,onError){
       var code_like  = entity.code+'%';
       console.log(code_like)
       WorkItem.findAll({where:{
         code: { $like:code_like},
         state:'Y'
       }}).then(onSuccess).catch(onError);
     },
      createOrUpdate:function(entity,onSuccess,onError){
        for(var key in entity) {
            if(entity.hasOwnProperty(key)) {
              if(!entity[key]&&entity[key]==''){
                delete entity[key];
              }
            }
        }
         if(entity.id!=null){     
           WorkItem.update(entity,{where:{id:entity.id}}).then(function(){
              return WorkItem.findById(entity.id);
           }).then(onSuccess).catch(onError);
         }else{
           return WorkItem.create(entity).then(onSuccess).catch(onError);
         }
       }
    }
   })

  return WorkItem;
}
