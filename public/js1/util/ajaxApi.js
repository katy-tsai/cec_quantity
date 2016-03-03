exports.categoriesDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/categoriesCode/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}

exports.categoriesDetaileDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/categoriesDetailed/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}
exports.treeDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/treeItems/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}
exports.itemDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/projectItems/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}

exports.saveItems = function(items,ProjectId,callback){
  var data = {items:items,ProjectId:ProjectId};
  var url = "main/saveItems";
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}

exports.projectDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/project/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}

exports.getItems = function(type,callback){
  var url="ajax/uiItems?type="+type;
  $.ajax({
    method: "get",
    url: url,
  })
  .done(function( msg ) {
    callback(msg);
  });

}

exports.getWorkItem = function(callback){
  var url="ajax/workItem";
  $.ajax({
    method: "get",
    url: url,
  })
  .done(function( msg ) {
    console.log(msg);
    callback(msg);
  });
}
