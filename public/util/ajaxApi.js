exports.itemService = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/service/ItemService/"+func;
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

exports.projectDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/Project/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}

exports.categoriesDao = function(func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/CategoriesCode/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}

exports.categoriesDetaileDao = function(model,func,obj,callback){
  var data = null;
  if(obj){
    data = obj;
  }
  var url = "main/"+model+"/"+func;
  $.ajax({
    method: "post",
    url: url,
    data:data
  })
  .done(function( msg ) {
    callback(msg);
  });
}
