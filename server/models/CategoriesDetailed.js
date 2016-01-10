module.exports = function(sequelize,DataTypes){
  var CategoriesDetailed =sequelize.define('CategoriesDetailed',{
    item:DataTypes.STRING(180),
    code:DataTypes.STRING(10),
    unit:DataTypes.STRING(5),
    contractNum:DataTypes.FLOAT(19,3),
    contractPrice:DataTypes.FLOAT(19,2)
  },
   {tableName: 'categoriesDetailed',
   instanceMethods:{
     getByCategoriesCode:function(entity,onSuccess,onError){
       var code_like  = entity.code+'%';

       CategoriesDetailed.findAll({where:{
         code: { $like:code_like}
       }}).then(onSuccess).catch(onError);
     }}})

  return CategoriesDetailed;
}
