var express = require('express');
const modeles = require('../models');
const Sequelize = require('Sequelize');
const ProjectItems = modeles.ProjectItems;
const Project = modeles.Project;
const CategoriesCode = modeles.CategoriesCode;
const CategoriesDetailed = modeles.CategoriesDetailed;
const ItemsDao = require('./ItemsDao');
var router = express.Router();
var path = require('path');
var log = require('../../logger');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./public/main.html'));
});

router.post('/project/:func',function(req,res){
    var obj = req.body;
    var project = Project.build();

    if(obj){
       project = Project.build(obj);
    }
    var func = project[req.params.func];
    func(obj,function(objs){
      res.json(objs);
    },function(err){
      log.err(err);
    })
});

router.post('/projectItems/:func',function(req,res){
    var obj = req.body;
    var projectItems = ProjectItems.build();
    if(obj){
       projectItems = ProjectItems.build(obj);
    }
    var func = projectItems[req.params.func];
    func(obj,function(objs){
      res.json(objs);
    },function(err){
      log.err(err);
    })
});
router.post('/categoriesCode/:func',function(req,res){
    var obj = req.body;
    var categoriesCode = CategoriesCode.build();
    if(obj){
       categoriesCode = CategoriesCode.build(obj);
    }
    var func = categoriesCode[req.params.func];
    func(obj,function(objs){
      res.json(objs);
    },function(err){
      log.err(err);
    })
});
router.post('/categoriesDetailed/:func',function(req,res){
    var obj = req.body;
    var categoriesDetailed = CategoriesDetailed.build();
    if(obj){
       categoriesDetailed = CategoriesDetailed.build(obj);
    }
    var func = categoriesDetailed[req.params.func];
    func(obj,function(objs){
      res.json(objs);
    },function(err){
      log.err(err);
    })
});
router.post('/saveItems',function(req,res){
    var obj = req.body;
    var items = obj.items;
    var ProjectId = obj.ProjectId;
    ItemsDao.crud(items,ProjectId,function(results){
      res.json(results);
    })
});

router.post('/saveProject',function(req,res){
  var obj = req.body;
  log.debug(obj);
  var project = Project.build(obj);
  project.createOrUpdate(function(newObj){
        res.json(newObj);
  }).catch(function(err){
      log.debug(err);
  })
})


module.exports = router;
