const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../../util/ajaxApi');
const treeData = require('../../util/TreeData');
const TreeView = require('../../componets/edit/TreeView');
const ListTable = require("../../componets/list/ListTable");
const _ = require('lodash');
var header =[{code:'index',name:'#',style:{width:'2%',textAlign:'center',verticalAlign:'middle'}},
            {code:'code',name:'項目編號',style:{width:'20%',verticalAlign:'middle'}},
            {code:'item',name:'項目名稱',style:{width:'45%',verticalAlign:'middle'}},
            {code:'unit',name:'單位',style:{width:'12%',textAlign:'center',verticalAlign:'middle'}},
            {code:'contractPrice',name:'單價',style:{width:'13%',verticalAlign:'middle'}},
            {code:'rightAdd',name:'',style:{width:'8%',textAlign:'center',verticalAlign:'middle'}}]

var Categories = React.createClass({
  getInitialState: function() {
   return {
     categories:[],
     categoriesDetail:[],
     dataTree:null,
     chooseItems:[]
   };
 },
 componentDidMount: function() {
   var type = "node";
   ajaxApi.categoriesDao("getBycType",{cType:type},function(items){
      var dataTree = treeData.initWithParentCode(items,'code');
      this.setState({categories:items,dataTree:dataTree});
   }.bind(this));
 },
  render(){
    var categories = this.state.categories;
    var dataTree = this.state.dataTree;
    var editNode = this.state.editNode;
    if(!dataTree){
      dataTree = treeData.initWithParentCode(categories,'code');
    }
    var categoriesDetail = this.state.categoriesDetail;
    return (
      <div>

        <div className="editItem_div">
          <div className="leftTreeView">
            <h1 className="view_title">編碼</h1>
            <TreeView dataTree={dataTree} paddingLeft={10} selectNodeView={this._handleSelectNodeView} setTree={this._handleSetTree}/>
          </div>
          <div className="topView">
            <h1 className="view_title">選擇</h1>
            <ListTable datas={categoriesDetail} header={header}  isRanderPagger='false'/>
          </div>

        </div>

      </div>
    )
  },
  _handleSetTree(tree){
    this.setState({dataTree:tree});
  },
  _handleSelectNodeView(node){
    var code = node.data.code;
    ajaxApi.categoriesDetaileDao("getByCategoriesCode",{code:code},function(items){
       this.setState({categoriesDetail:items});
    }.bind(this));
  },

});

module.exports = Categories;
