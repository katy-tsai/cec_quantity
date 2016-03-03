var express = require('express');
const modeles = require('../models');
const Sequelize = require('Sequelize');

var router = express.Router();
var path = require('path');
var log = require('../../logger');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./public/main.html'));
});

router.post('/:model/:func',function(req,res){
  var obj = req.body;
  var model = modeles[req.params.model].build();
  if(obj){
     model = modeles[req.params.model].build(obj);
  }
  var func = model[req.params.func];
  func(obj,function(objs){
    res.json(objs);
  },function(err){
    log.err(err);
  })
})

router.post('/service/:model/:func',function(req,res){
  var obj = req.body;
  var model = require('../service/'+req.params.model);
  var func = model[req.params.func];
  func.call(model,obj,function(objs){
    res.json(objs);
  },function(err){
    log.err(err);
  })

})

// router.post('/project/:func',function(req,res){
//     var obj = req.body;
//     var project = Project.build();
//     if(obj){
//        project = Project.build(obj);
//     }
//     var func = project[req.params.func];
//     func(obj,function(objs){
//       res.json(objs);
//     },function(err){
//       log.err(err);
//     })
// });
// router.post('/treeItems/getTreeItems',function(req,res){
//     var obj = req.body;
//     var ProjectId = obj.ProjectId;
//     console.log("router.post('/treeItems/getTreeItems') porjectId::",ProjectId)
//     ItemsDao.getTreeItems(ProjectId,function(objs){
//       console.log("router.post('/treeItems/getTreeItems') objs::",objs)
//       res.json(objs);
//     },function(err){
//       log.err(err);
//     })
// });

// router.post('/saveItems',function(req,res){
//     var obj = req.body;
//     var items = obj.items;
//     console.log('saveItems = ',items)
//     var ProjectId = obj.ProjectId;
//     ItemsDao.crud(items,ProjectId,function(results){
//       res.json(results);
//     })
// });
// router.post('/saveProject',function(req,res){
//   var obj = req.body;
//   log.debug(obj);
//   var project = Project.build(obj);
//   project.createOrUpdate(function(newObj){
//         res.json(newObj);
//   }).catch(function(err){
//       log.debug(err);
//   })
// })
// router.post('/projectItems/:func',function(req,res){
//     var obj = req.body;
//     var projectItems = ProjectItems.build();
//     if(obj){
//        projectItems = ProjectItems.build(obj);
//     }
//     var func = projectItems[req.params.func];
//     func(obj,function(objs){
//       res.json(objs);
//     },function(err){
//       log.err(err);
//     })
// });
// router.post('/categoriesCode/:func',function(req,res){
//     var obj = req.body;
//     var categoriesCode = CategoriesCode.build();
//     if(obj){
//        categoriesCode = CategoriesCode.build(obj);
//     }
//     var func = categoriesCode[req.params.func];
//     func(obj,function(objs){
//       res.json(objs);
//     },function(err){
//       log.err(err);
//     })
// });
// router.post('/categoriesDetailed/:func',function(req,res){
//     var obj = req.body;
//     var categoriesDetailed = CategoriesDetailed.build();
//     if(obj){
//        categoriesDetailed = CategoriesDetailed.build(obj);
//     }
//     var func = categoriesDetailed[req.params.func];
//     func(obj,function(objs){
//       res.json(objs);
//     },function(err){
//       log.err(err);
//     })
// });





module.exports = router;
