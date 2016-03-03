var express = require('express');
var router = express.Router();
var path = require('path');
var modeles = require('../models');
var UIsettings = modeles.UIsettings;
var WorkItem = modeles.WorkItem;

router.get('/uiItems', function(req, res, next) {
  var type = req.query.type;
  UIsettings.findAll({
      where:{
        type:type
      },
      order: 'code asc'
  }).then(function(findobjs){
    res.json(findobjs);
  })
});

router.get('/workItem', function(req, res, next) {
  WorkItem.findAll().then(function(findobjs){
    res.json(findobjs);
  })
});
module.exports = router;
