const React = require('react');
const ReactDOM = require('react-dom');


var TextField = React.createClass({
  render() {
    var width = this.props.width ?{width:this.props.width} :{};
    var value = this.props.value;
    if(value){
       value = (this.props.type=="date")?new Date(value).toISOString().split('T')[0]:value;
    }
      return (
         <div className = "input-field" style={width}>
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input type={this.props.type}  id={this.props.id}  className="text-input" name={this.props.name}
            onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur}
            onEnterKeyDown={this.props.onEnterKeyDown} value={value}/>
          {this.props.suffix?<div className="suffix-label">{this.props.suffix}</div>:''}

         </div >
      )
    }
})

module.exports = TextField;
