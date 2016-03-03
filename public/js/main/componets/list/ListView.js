const React = require('react');
const ReactDOM = require('react-dom');

var ListView = React.createClass({
  render(){
    var lists = this.props.lists;

    var views = lists.map(function(obj,i){

      var selectClassName = (this.props.selectIndex!=null)?(this.props.selectIndex==i?"select_active":""):"";
      return (
        <li data-id={i} key={i} onClick={this.props.onClick.bind(null,i)} className={selectClassName}>
          {obj.projectName}(工程編號：{obj.projectCode})
        </li>
      )
    }.bind(this));
    return (
      <div  className="listView">
        <ul>
          {views}
        </ul>
      </div>
    )
  }
});
module.exports = ListView;
