const modeles = require('../server/models');
const CategoriesCode = modeles.CategoriesCode;
const data = require("./CategoriesCodes.json").data;
const TreeData = require('../public/js/util/TreeData');
const testdata = require("./data");
 CategoriesCode.sync({force:true}).then(function(){
   CategoriesCode.bulkCreate(data).then(function() {
     return CategoriesCode.findAll();
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
