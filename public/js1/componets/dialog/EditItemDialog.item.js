const React = require('react');
const ReactDOM = require('react-dom');

var Editltem = React.createClass({

  render(){
    var obj = this.props.item;
    var index = this.props.index;
    var itemClass = 'editItem-'+(index+1);
    var deletebtn = (obj['hasChild']== 'N')?
      <button className="button color-blue-500 delete-icon" onClick={this.props.deletItem.bind(null,index)}><i className="icon-delete" ></i>刪除</button>:
      <span className="button color-red-700"><i className=" icon-warning" ></i>含子項目不可刪除</span>
    return (
      <li >

        {deletebtn}
        <div  className={itemClass}>
          <input type="text" value={obj.item} onChange={this.props.editChange.bind(null,index)}/>
        </div>
      </li>
    )
  }
});

module.exports = Editltem;
