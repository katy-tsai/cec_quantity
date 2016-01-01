
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

exports.saveItems = function(item,callback){
  var url="main/saveItems";
  $.ajax({
    method: "post",
    data:item,
    url: url,
  })
  .done(function( item ) {
    console.log(item);
    callback(item);
  });
}
