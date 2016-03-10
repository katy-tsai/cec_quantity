var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile(path.resolve('./public/index.html'));
});

router.post('/checkAccount',function(req,res,next){
  var loginuser=req.body;

  auth.on('errormsg',function(msg){
    console.log('err',msg);
      res.send(msg);
  });

  auth.on('success',function(data){
    console.log(data);
    res.send(data);
  })
    auth.login(req.body.account,req.body.password);

});



module.exports = router;
