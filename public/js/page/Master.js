const React = require('react');
const ReactDOM = require('react-dom');
const AppBar = require('../componets/AppBar');
const LeftNav = require('../componets/LeftNav');
const Master = React.createClass({

  render(){
    return (
      <div className="desktop">
          <AppBar title='CEC建築工料分析系統'/>
        <div className="sidemenu sidebar responsive" id="navigation-sidemenu" >
           <LeftNav />
        </div>
        <div className="main-content">
          <div className="navigation-section">
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Master;
