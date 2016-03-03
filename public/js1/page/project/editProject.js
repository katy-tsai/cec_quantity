const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../../util/ajaxApi');
const Breadcrumb = require("../../componets/Breadcrumb");
const ListTable = require("../../componets/list/ListTable");
const EditTable = require("../../componets/edit/EditTable");
const EditltemDialog = require("../../componets/dialog/EditItemDialog");
const treeData = require('../../util/TreeData');
var header =[{code:'index',name:'#',style:{width:'2%'}},
            {code:'projectCode',name:'工程編號',style:{width:'10%'}},
            {code:'projectName',name:'工程名稱',style:{width:'20%'}},
            {code:'projectLocation',name:'工程地點',style:{width:'15%'}},
            {code:'writeUser',name:'填報人員',style:{width:'15%'}},
            {code:'checkUser',name:'審查人員',style:{width:'15%'}},
            {code:'createAt',name:'建檔日期',style:{width:'10%'}},
            {code:'isLock',name:'鎖定',style:{width:'8%'}},
            {code:'edit',name:'編輯',style:{width:'5%'}}];
var EditProject = React.createClass({
  getInitialState: function() {
   return {
     projects:[],
     editProject:{},
     editItemsTree:[],
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
       editItemsTree={editItemsTree} setItems={this.setItems}
          project={editProject}/>:'';
    // console.log('2.render edittable item:',editProjectItems);
     return (
       <div>
         <Breadcrumb header={editProject.projectName } toolbar={toolbar} editItem={this._handleEditItem} copyItem={this._handleCopyItem} returnList = {this._handleReturnList}/>
         <div className="editContainer card" z="5">
           <EditTable editProject={editProject} editItemsTree={editItemsTree}/>
         </div>
         {showEditDialog}
       </div>
     )
 },
  render(){
    var projects = this.state.projects;
    return this.state.view =="list"?this.renderList():this.renderEdit();
  },
  setItems(items){
    console.log('1.setitems',items)
    var tree = treeData.init(items);
    this.setState({editItemsTree:tree,view:'edit'});
  },
  _handleEditClick(index){
    var projects = this.state.projects;
    var editProject = projects[index];
    var projectId = editProject.id;
    ajaxApi.treeDao('getItems',{ProjectId:projectId},function(data){
      var tree = treeData.init(data);
      this.setState({editProject:editProject,view:'edit',editItemsTree:tree});
    }.bind(this));

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
