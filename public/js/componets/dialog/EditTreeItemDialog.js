const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const ajaxApi = require('../../util/ajaxApi');
const treeData = require('../../util/TreeData');
const TreeView = require('../edit/TreeView');
const ListTable = require("../list/ListTable");
var header =[{code:'index',name:'#',width:'2%'},
            {code:'code',name:'項目編號',width:'10%'},
            {code:'item',name:'項目名稱',width:'45%'},
            {code:'unit',name:'單位',width:'8%'},
            {code:'contractPrice',name:'單價',width:'10%'},
            {code:'checkbox',name:' ',width:'5%'}]

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
     dataTree:{}
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
    var dataTree = treeData.initWithParentCode(categories,'code');
    var categoriesDetail = this.state.categoriesDetail;
    console.log(categoriesDetail)
    return (
      <Dialog title={this.props.title} closeDialog={this.props.closeDialog} width="98%" height ="790px" marginTop="3px">

        <div className="editItem_div">
          <div className="leftTreeView">
            <h1>料號編碼</h1>
            <TreeView dataTree={dataTree} paddingLeft={10} selectNodeView={this._handleSelectNodeView}/>
          </div>
          <div className="middleView">
            <h1>選擇料號</h1>
            <ListTable datas={categoriesDetail} header={header} editClick={this._handleselectClick} isRanderPagger='false'/>
          </div>
        </div>
        <div className = "footer_btn">
          <button className="button raised bg-blue-500 color-white okBtn" onClick={this._handleCloseDialog}>確認</button>
        </div>
      </Dialog>
    )
  },
  _handleselectClick(item){

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
