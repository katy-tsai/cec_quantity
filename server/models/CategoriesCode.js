module.exports = function(sequelize,DataTypes){
  var CategoriesCode =sequelize.define('CategoriesCode',{
    item:DataTypes.STRING(180),
    code:DataTypes.STRING(10),
    itemCode:DataTypes.STRING(10),
    parent:DataTypes.STRING(10),
    hasChild:DataTypes.STRING(1),
    type:DataTypes.STRING(10),
    cType:DataTypes.STRING(20),
    state:{
      type:DataTypes.STRING(1),
      defaultValue:'Y'
    }
  },
   {tableName: 'categoriesCode',
   instanceMethods:{
     getBycType:function(entity,onSuccess,onError){
       var cType = entity.cType;
       CategoriesCode.findAll({where:{
         cType:cType,state:'Y'
       }}).then(onSuccess).catch(onError);
     }}})

  return CategoriesCode;
}
