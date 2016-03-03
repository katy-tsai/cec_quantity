const React = require('react');
const ReactDOM = require('react-dom');
const Breadcrumb = require("../componets/breadcrumb/Breadcrumb");
const ListTable = require("../componets/list/ListTable");
const TreeTable = require("../componets/tree/TreeTable");
const EditltemDialog = require("../componets/dialog/EditItemDialog");
const ajaxApi = require('../../../util/ajaxApi');
const treeData = require('../../../util/TreeData')
var header =[{code:'index',name:'#',style:{width:'2%'}},
            {code:'projectCode',name:'工程編號',style:{width:'10%'}},
            {code:'projectName',name:'工程名稱',style:{width:'20%'}},
            {code:'projectLocation',name:'工程地點',style:{width:'15%'}},
            {code:'baseArea',name:'基地面積',style:{width:'10%'}},
            {code:'totalFloorArea',name:'樓板面積',style:{width:'10%'}},
            {code:'createdAt',name:'建檔日期',style:{width:'20%'}},
            {code:'isLock',name:'鎖定',style:{width:'8%'}},
            {code:'edit',name:'編輯',style:{width:'5%'}}];
var EditProject = React.createClass({
  getInitialState: function() {
   return {
     projects:[],
     editProject:{},
     editItemsTree:{},
     view:"list",
     tree:{},
     isShowEditDialog:false

   };
 },

 componentDidMount: function() {
   ajaxApi.projectDao('getAll',null,function(data){
     this.setState({projects:data});
   }.bind(this));
 },
 renderList(){
   var projects = this.state.projects;
   return (
     <div>
         <Breadcrumb header="工項編輯" />
         <div className="editContainer card" z="5">
           <ListTable datas={projects} header={header} editClick={this._handleEditClick}/>
         </div>
      </div>
   )
 },
 renderEdit(){
     var editProject = this.state.editProject;
     var toolbar =[{name:'項目編輯',clickFun:'editItem',icon:'icon-border-color'},
                   {name:'複製工項',clickFun:'copyItem',icon:'icon-content-copy'},
                   {name:'返回列表',clickFun:'returnList',icon:'icon-format-list-bullet'}];
    var editItemsTree = this.state.editItemsTree;
    var showEditDialog = this.state.isShowEditDialog?
      <EditltemDialog closeDialog={this._handleCloseEditDialog}
       editItemsTree={editItemsTree} saveItems={this._handleSaveItems}
          project={editProject}/>:'';
    // console.log('2.render edittable item:',editProjectItems);
     return (
       <div>
         <Breadcrumb header={editProject.projectName } toolbar={toolbar} editItem={this._handleEditItem} copyItem={this._handleCopyItem} returnList = {this._handleReturnList}/>
         <div className="editContainer card" z="5">
           <TreeTable editProject={editProject} editItemsTree={editItemsTree} setEditItemTree={this._handleEditItemTree}/>
         </div>
         {showEditDialog}
       </div>
     )
 },
  render(){
      console.log("=================2.render")
    var projects = this.state.projects;
    return this.state.view =="list"?this.renderList():this.renderEdit();
  },
  _handleSaveItems(items,projectId){
    ajaxApi.itemService('crud',{items:items,projectId:projectId},function(items){
      var tree = treeData.init(items)
      this.setState({view:'edit',editItemsTree:tree});
    }.bind(this));
  },
  _handleEditClick(index){
    var projects = this.state.projects;
    var editProject = projects[index];
    var ProjectId = editProject.id;
    ajaxApi.itemService('getProjectItems',{ProjectId:ProjectId},function(data){
      var tree = treeData.init(data);
      console.log(tree)
      this.setState({editProject:editProject,view:'edit',editItemsTree:tree});
    }.bind(this));

  },
  _handleEditItemTree(tree){
    console.log("=================1.set tree")
    this.setState({editItemsTree:tree})
  },
  _handleEditItem(){
    this.setState({isShowEditDialog:true});
  },
  _handleCloseEditDialog(){
    this.setState({isShowEditDialog:false});
  },
  _handleCopyItem(){

  },
  _handleReturnList(){
    this.setState({view:'list',editProject:{},editItemsTree:[]});
  }
})
module.exports = EditProject;
