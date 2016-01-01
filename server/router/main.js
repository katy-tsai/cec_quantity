var express = require('express');
const modeles = require('../models');
const ProjectItems = modeles.ProjectItems;
const Project = modeles.Project;
var router = express.Router();
var path = require('path');
var log = require('../../logger');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('./public/main.html'));
});

router.post('/project/:func',function(req,res){
    var item = req.body;
    var project = Project.build();
    if(item){
       project = Project.build(item);
    }

    var func = project[req.params.func];
    func(function(objs){
      console.log(objs)
      res.json(objs);
    },function(err){
      log.err(err);
    })
  //  project.getAll(function(objs){
  //    console.log(objs)
  //    res.json(objs);
  //  },function(err){
  //      log.debug(err);
  //  })


})
router.post('/saveItems',function(req,res){
  var item = req.body;
  log.debug(item);
  var projectItems = ProjectItems.build(item);
  projectItems.createOrUpdate(function(newObj){
    res.json(newObj);
  }).catch(function(err){
      log.debug(err);
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
