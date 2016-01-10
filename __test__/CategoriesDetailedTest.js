const modeles = require('../server/models');
const CategoriesDetailed = modeles.CategoriesDetailed;
const data = require("./CategoriesDetailed.json").data;

 CategoriesDetailed.sync({force:true}).then(function(){
   CategoriesDetailed.bulkCreate(data).then(function() {
     return CategoriesDetailed.findAll();
   }).then(function(item) {
     console.log(item);
   })
 })

 //var tree = TreeData.init(data,'id');

// var categoriesCode = CategoriesCode.build();
//
// categoriesCode.getBycType({cType:'node'},function(items){
//   var tree = TreeData.initWithParentCode(items,'code');
//   console.log(tree)
// },function(err){
//   console.log(err)
// })
