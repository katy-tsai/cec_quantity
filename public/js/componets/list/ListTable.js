const React = require('react');
const ReactDOM = require('react-dom');
var ListTable = React.createClass({
  getInitialState: function() {
   return {
     page:1,
     pageNum:this.props.pageNum||12,
     selectRow:""
   };
 },
  render(){
      var header = this.props.header.map(function(obj,i){
        var width = obj.width;
        return (
          <th key={"th_"+i} code={obj.code} style={{width:width}}>{obj.name}</th>
        )
      });
      var attrs = this.props.header;
      var projects = this.props.datas;
      var page = this.state.page;
      var pageNum = this.state.pageNum;
      var start = (page-1)*pageNum;
      var max = start+pageNum;
      var selectRow = this.state.selectRow;
      var editClick = this.props.editClick;
      var datas = projects.map(function(obj,index){
        var rowActive = (selectRow==index)?'rowActive':'';
        var obj_props =null;
        if(index>=start &&index<max){
          obj_props = attrs.map(function(attr,i){
              var width = attr.width;
              var value = attr.code=="index"?index+1:obj[attr.code];
              var index_key = index+"_td_"+i;
              if(attr.code=='edit'){
                return (
                    <td key={index_key}  style={{width:width}} className=" edit-icon" onClick={editClick.bind(null,index)}><i className="icon-mode-edit"></i></td>
                )
              }else{
                return (
                    <td key={index_key}  style={{width:width}}>{value}</td>
                )
              }

          });
        }
        return (
          <tr key={"tr_"+index} className={rowActive} onClick={this._handlerRowClick.bind(this,index)}>
            {obj_props}
          </tr>
        )
      }.bind(this));

    return (
      <div>
        <table className="list-table">
          <thead>
            <tr>
              {header}
            </tr>
          </thead>
          <tbody>
            {datas}
          </tbody>
        </table>
        <div className="tfooter">
          {this.renderPagger()}
        </div>
      </div>
    )
  },

  renderPagger:function(){
    var projects = this.props.datas;
    var pageNum = this.state.pageNum;
    var isRanderPagger = this.props.isRanderPagger||true;
    var totalPage = Math.ceil(projects.length/pageNum);
    var page = this.state.page;
    var pagger = [];
    if(isRanderPagger=='true'){
        console.log(pagger)
      pagger.push(<div className="pagination" key={"page_0"} onClick={this._handlePagePre}><i className=" icon-keyboard-arrow-left"></i></div>)
      for(var i=1 ;i<=totalPage;i++){
        var pageClass = "pagination"
        if(i==page){
          pageClass="pagination active"
        }
        pagger.push(<div className={pageClass} key={"page_"+i} onClick={this._handlePageClick.bind(this,i)}>{i}</div>) ;
      }
      pagger.push(<div className="pagination" key={"page_l"} onClick={this._handlePageNext}><i className=" icon-keyboard-arrow-right"></i></div>)
    }
    return pagger;
  },
  _handlePageClick(i){
    var page = i;
    this.setState({page:page});
  },
  _handlerRowClick(i){
    var selectRow = i;
    this.setState({selectRow:selectRow});
  },
  _handlePagePre(){
    var page = this.state.page;
    var prePage = (page==1)?1:page-1;
    this.setState({page:prePage});
  },
  _handlePageNext(){
    var projects = this.props.datas;
    var pageNum = this.state.pageNum;
    var totalPage = Math.ceil(projects.length/pageNum);
    var page = this.state.page;
    var nextPage = (page==totalPage)?totalPage:page+1;
    this.setState({page:nextPage});
  }
});
module.exports = ListTable;
