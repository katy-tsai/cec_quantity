module.exports = function(sequelize,DataTypes){
  var MaterialItem =sequelize.define('MaterialItem',{
    item:DataTypes.STRING(180),
    code:DataTypes.STRING(10),
    unit:DataTypes.STRING(5),
    contractPrice:DataTypes.FLOAT(19,0),
    state:{
      type:DataTypes.STRING(1),
      defaultValue:'Y'
    }
  },
   {tableName: 'materialItem',
   instanceMethods:{
     getByCode:function(entity,onSuccess,onError){
       MaterialItem.findAll({where:entity}).then(onSuccess).catch(onError);
     },
     getByCategoriesCode:function(entity,onSuccess,onError){
       var code_like  = entity.code+'%';
       MaterialItem.findAll({where:{
         code: { $like:code_like},
         state:'Y'
       }}).then(onSuccess).catch(onError);
     }}
   })

  return MaterialItem;
}
