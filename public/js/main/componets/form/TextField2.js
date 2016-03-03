const React = require('react');
const ReactDOM = require('react-dom');


var TextField2 = React.createClass({
  render() {
    var width = this.props.width ?{width:this.props.width} :{};
      return (
         <div className = "input-field-2" style={width}>
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input type={this.props.type}  id={this.props.id}  className="text-input" name={this.props.name}
            onChange={this.props.onChange} onFocus={this.props.onFocus} onBlur={this.props.onBlur}
            onEnterKeyDown={this.props.onEnterKeyDown} value={this.props.value1}/>
          {this.props.suffix?<div className="suffix-label">{this.props.suffix}</div>:''}
          <input type={this.props.type}  id={this.props.id2}  className="text-input" name={this.props.name2}
            onChange={this.props.onChange2} onFocus={this.props.onFocus2} onBlur={this.props.onBlur2}
            onEnterKeyDown={this.props.onEnterKeyDown2} value={this.props.value2}/>
          {this.props.suffix2?<div className="suffix-label">{this.props.suffix2}</div>:''}
         </div >
      )
    }
})

module.exports = TextField2;
