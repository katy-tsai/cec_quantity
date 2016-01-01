const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../util/ajaxApi');

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

var ProjectItem = React.createClass({
  getInitialState: function() {
   return {
     data:[],
     project:this.props.project,
     isdrop:false,
     items:this.props.items,
     isShowNote:true
   };
 },
 componentDidMount: function() {
   ajaxApi.getWorkItem(function(data){
     this.setState({data:data});
   }.bind(this));

 },
 saveItems:function(item){
   var items = this.props.items;
   ajaxApi.saveItems(item,function(data){
     items[data.order] = data;
     this.setState({items:items});
     this.props.itemChange(items);
   }.bind(this));
 },
  render(){

    var project = this.props.project;
    var listItems = this.state.data.map(function(obj,i){
      return (
        <li data-id={i} key={i} draggable="true" className="drag" onDragEnd={this.dragEnd} onDragStart={this.dragStart}>
          {obj.item}
        </li>
      )
    }.bind(this));

    var chooseItems = this.state.items.map(function(obj,i){
      var choseClass = 'editItem-'+(i+1);
      var index = i;
      return (
        <li data-id={i} key={i} onDragOver={this.dragOver} onDragLeave={this.dragLeave}  className={choseClass}>
          {obj.item}<button className="button color-blue-500 delete-icon" onClick={this.handleDelete.bind(this,i)}><i className="icon-delete" ></i>刪除</button>
        </li>
      )
    }.bind(this));

    var itemsLength = this.state.items.length;
    var noteWorkItems =   <div className="noteWorkItems"><i className="icon-add-circle-outline" style={{fontSize:'30px'}}></i>請選擇工作項目列表新增</div>;
    var isShowNote = this.state.isShowNote;
    return (
      <div className="form-div">
          <div className="form-header">工作項目</div>
          <div className = "choose-workItem">
            <div className = "chooseItem-div" >
             <div className = "chooseItem-header" >工作項目列表</div>
             <ul id="chooseItem">
              {listItems}
            </ul>
            </div >

            <div className = "editItem-div" >
             <div className = "editItem-header" >編輯{project.projectName}工作項目</div>
             <ul id="dropContainer" onDragOver={this.dragOver} onDrop={this.drop} className="container" onDragEnter={this.dragEnter} >
              {(isShowNote)?noteWorkItems:chooseItems}
              </ul>
            </div >
          </div>

      </div>
    )
  },
  dragStart:function(e){
    this.dragged = e.currentTarget;
    this.setState({isdrop:false,isShowNote:false});
    e.dataTransfer.effectAllowed ='copy';

  },
  dragOver:function(e){
    e.preventDefault();
    e.stopPropagation();
    //this.dragged.style.display="none";
    var itemsLength = this.state.items.length;
    if(e.target.className=='placeholder') return ;
    this.over = e.target;
    if(e.target.className=='container'){
        placeholder.setAttribute('index',Number(itemsLength));
      e.target.appendChild(placeholder);
    }else{
      placeholder.setAttribute('index',Number(this.over.dataset.id));
      e.target.parentNode.insertBefore(placeholder,e.target);
    }

  },


  drop:function(e){
    var index = placeholder.getAttribute('index');
    e.target.parentNode.removeChild(placeholder);
    this.over = e.target;

    var items = this.state.items;
    var data = this.state.data;
    var form = Number(this.dragged.dataset.id);
    var to = index;
    var choose = data[form];
    var project = this.props.project;
    console.log(project.id)
    var projectItem = {item:choose.item,hasChild:'N',order:to,type:'root',ProjectId:project.id};

    if(isNaN(to)){
      items=items.concat(projectItem);
      this.setState({items:items,isdrop:true});
      this.saveItems(projectItem);
    }else{
      items.splice(to,0,projectItem);
      this.setState({items:items,isdrop:true});
      this.saveItems(projectItem);
    }


  },
  dragEnd:function(e){
    if(!this.state.isdrop){
      var node = document.getElementById("dropContainer")
      node.removeChild(placeholder);
    }
  },
  dragEnter:function(e){
    e.dataTransfer.dropEffect = 'copy';

  },
  handleDelete:function(index){
    var items = this.state.items;
    items.splice(index,1);
    this.setState({items:items});
  }



});

module.exports = ProjectItem;
