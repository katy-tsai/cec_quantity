const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const ajaxApi = require('../../util/ajaxApi');
const treeData = require('../../util/TreeData');
const TreeView = require('../edit/TreeView');
const ListTable = require("../list/ListTable");
const _ = require('lodash');
var header =[{code:'index',name:'#',style:{width:'2%',textAlign:'center',verticalAlign:'middle'}},
            {code:'code',name:'項目編號',style:{width:'20%',verticalAlign:'middle'}},
            {code:'item',name:'項目名稱',style:{width:'45%',verticalAlign:'middle'}},
            {code:'unit',name:'單位',style:{width:'12%',textAlign:'center',verticalAlign:'middle'}},
            {code:'contractPrice',name:'單價',style:{width:'13%',verticalAlign:'middle'}},
            {code:'rightAdd',name:'',style:{width:'8%',textAlign:'center',verticalAlign:'middle'}}]

var EditTreeltemDialog = React.createClass({
  getInitialState: function() {
   var projectItems = this.props.editProjectItems;
   return {
     project:this.props.project,
     projectItems:projectItems,
     editNode:this.props.editNode,
     type:this.props.type,
     categories:[],
     categoriesDetail:[],
     dataTree:null,
     chooseItems:[]
   };
 },
 componentDidMount: function() {
   var type = this.props.type;
   ajaxApi.categoriesDao("getBycType",{cType:type},function(items){
      var dataTree = treeData.initWithParentCode(items,'code');
      this.setState({categories:items,dataTree:dataTree});
   }.bind(this));


 },
  render(){
    var categories = this.state.categories;
    var dataTree = this.state.dataTree;
    var project = this.state.project;
    var editNode = this.state.editNode;
    var projectItems = this.state.projectItems;
    var parentId = editNode.data.id;
    var type = this.state.type;
    var typeName = (type=='node')?"工料":"工項";
    var chooseItems =  _.sortBy(_.filter(projectItems,{parent:parentId }),'order');
    console.log(chooseItems)
    if(!dataTree){
      dataTree = treeData.initWithParentCode(categories,'code');
    }
    var categoriesDetail = this.state.categoriesDetail;
    return (
      <Dialog title={this.props.title} closeDialog={this.props.closeDialog} width="98%" height ="790px" marginTop="3px">

        <div className="editItem_div">
          <div className="leftTreeView">
            <h1 className="view_title">{typeName}編碼</h1>
            <TreeView dataTree={dataTree} paddingLeft={10} selectNodeView={this._handleSelectNodeView} setTree={this._handleSetTree}/>
          </div>
          <div className="middleView">
            <h1 className="view_title">選擇{typeName}</h1>
            <ListTable datas={categoriesDetail} header={header} addClick={this._handleselectClick} isRanderPagger='false'/>
          </div>
          <div className="rightView">
            <h1 className="view_title">{project.projectName} <i className="icon-forward"></i> {editNode.data.item}</h1>

          </div>
        </div>
        <div className = "footer_btn">
          <button className="button raised bg-blue-500 color-white okBtn" onClick={this._handleCloseDialog}>確認</button>
        </div>
      </Dialog>
    )
  },

  _handleSetTree(tree){
    this.setState({dataTree:tree});
  },
  _handleselectClick(item){
    var editNode = this.state.editNode;
    item.parentId = editNode.data.id;
    item.type = 'node';

    this.setState({projectItems:projectItems.concat(item)});
  },
  _handleSelectNodeView(node){
    var code = node.data.code;
    ajaxApi.categoriesDetaileDao("getByCategoriesCode",{code:code},function(items){
       this.setState({categoriesDetail:items});
    }.bind(this));
  },
  _handleCloseDialog(){

  },
});

module.exports = EditTreeltemDialog;
