const React = require('react');
const ReactDOM = require('react-dom');
const TextField = require('./TextField');
const TextField2 = require('./TextField2');
const SelectField = require('./SelectField');
const ajaxApi = require('../../../../util/ajaxApi');


var ProjectForm = React.createClass({
  getInitialState: function() {
   return {
     buildingUses: [{"code":'0',"text":""}],
     structureTypes:[{"code":'0',"text":""}],
     buildingMethods:[{"code":'0',"text":""}],
     bracedExcavations: [{"code":'0',"text":""}],
     facadess:[{"code":'0',"text":""}],
     companys:[{"code":'0',"text":""},{"code":'1',"text":"大陸工程"},{"code":'2',"text":"大陸建設"}],
     project:this.props.project
   };
 },

  componentDidMount: function() {
    ajaxApi.getItems('buildingUse',function(data){
      var buildingUses = this.state.buildingUses;
      this.setState({buildingUses:buildingUses.concat(data)});
    }.bind(this));

    ajaxApi.getItems('structureType',function(data){
      var structureTypes = this.state.structureTypes;
      this.setState({structureTypes:structureTypes.concat(data)});
    }.bind(this));

    ajaxApi.getItems('buildingMethod',function(data){

      var buildingMethods = this.state.buildingMethods;
      this.setState({buildingMethods:buildingMethods.concat(data)});
    }.bind(this));

    ajaxApi.getItems('bracedExcavation',function(data){
      var bracedExcavations = this.state.bracedExcavations;
      this.setState({bracedExcavations:bracedExcavations.concat(data)});
    }.bind(this));

    ajaxApi.getItems('facades',function(data){
      var facadess = this.state.facadess;
      this.setState({facadess:facadess.concat(data)});
    }.bind(this));


  },

  render(){
    var project = this.props.project;
    return (
      <div className="form-div">
        <div className="form-header">專案內容</div>
        <form>
          <div className="form-row">
              <TextField label = "工程編號" id="projectCode" name="projectCode" type="text"
                     onChange={this.props.fileChange.bind(null,'projectCode')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus={this._handleOnFocus} value={project.projectCode} />
             <TextField  label = "工程名稱" id="projectName" name="projectName" type="text"
                      onChange={this.props.fileChange.bind(null,'projectName')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                      onFocus={this._handleOnFocus}   value={project.projectName}/>
          </div>

          <div className="form-row">
              <TextField   label = "工程別號" id="projectAlias" name="projectAlias" type="text"
                       onChange={this.props.fileChange.bind(null,'projectAlias')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                       onFocus={this._handleOnFocus}  value={project.projectAlias}/>
              <TextField   label = "業主" id="owners" name="owners" type="text"
                     onChange={this.props.fileChange.bind(null,'owners')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus={this._handleOnFocus} value={project.owners} />
          </div>

          <div className="form-row">
             <TextField label = "建築師" id="architect" name="architect" type="text"
                      onChange={this.props.fileChange.bind(null,'architect')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                      onFocus={this._handleOnFocus}  value={project.architect} />
              <TextField label = "用途說明" id="note" name="note" type="text"
                       onChange={this.props.fileChange.bind(null,'note')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                       onFocus={this._handleOnFocus}  value={project.note}/>
          </div>

          <div className="form-row">
              <TextField label = "工程地點" id="projectLocation" name="projectLocation" type="text"
                     onChange={this.props.fileChange.bind(null,'projectLocation')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus={this._handleOnFocus} value={project.projectLocation} />
              <SelectField label="承攬公司"  id="company" name="company" menuItems ={this.state.companys}
                     onChange={this.props.fileChange.bind(null,'company')} value={project.company}  />
          </div>

          <div className="form-row">
             <TextField label = "合約工期" id="contractDate" name="contractDate" type="number"
                      onChange={this.props.fileChange.bind(null,'contractDate')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                      onFocus={this._handleOnFocus} value={project.contractDate} suffix="天"/>
              <TextField label = "放樣勘驗" id="startDate" name="startDate" type="date"
                   onChange={this.props.fileChange.bind(null,'startDate')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                   onFocus={this._handleOnFocus} value={project.startDate} />
            </div>

          <div className="form-row">
             <TextField  label = "使照取得" id="completionDate" name="completionDate" type="date"
                   onChange={this.props.fileChange.bind(null,'completionDate')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                   onFocus={this._handleOnFocus} value={project.completionDate} />
              <SelectField label="建物用途"  id="buildingUse" name="buildingUse" menuItems ={this.state.buildingUses}
                   onChange={this.props.fileChange.bind(null,'buildingUse')} value={project.buildingUse} />
            </div>

            <div className="form-row">
               <SelectField label="結構型式"  id="structureType" name="structureType" menuItems ={this.state.structureTypes}
                   onChange={this.props.fileChange.bind(null,'structureType')}  value={project.structureType} />
               <SelectField label="建造工法"  id="buildingMethod" name="buildingMethod" menuItems ={this.state.buildingMethods}
                    onChange={this.props.fileChange.bind(null,'buildingMethod')} value={project.buildingMethod} />
            </div>

            <div className="form-row">
              <SelectField label="擋士開挖"  id="bracedExcavation" name="bracedExcavation" menuItems ={this.state.bracedExcavations}
                   onChange={this.props.fileChange.bind(null,'bracedExcavation')}   value={project.bracedExcavation} />
              <SelectField label="外牆型態"  id="facades" name="facades" menuItems ={this.state.facadess}
                 onChange={this.props.fileChange.bind(null,'facades')}   value={project.facades}/>
            </div>

            <div className="form-row">
              <TextField  label = "基地面積" id="baseArea" name="baseArea" type="number"
                     onChange={this.props.fileChange.bind(null,'baseArea')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus={this._handleOnFocus}  suffix="M2"  value={project.baseArea}/>
              <TextField  label = "樓板面積" id="totalFloorArea" name="totalFloorArea" type="number"
                      onChange={this.props.fileChange.bind(null,'totalFloorArea')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                      onFocus={this._handleOnFocus}  suffix="M2" value={project.totalFloorArea}/>
            </div>

            <div className="form-row">
              <TextField2  label = "地下樓層" id="undergroundNum" name="undergroundNum" type="number" id2="undergroundArea" name2="undergroundArea"
                     onChange={this.props.fileChange.bind(null,'undergroundNum')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus={this._handleOnFocus}  suffix="層" value1={project.undergroundNum}
                     onChange2={this.props.fileChange.bind(null,'undergroundArea')} onEnterKeyDown2={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus2={this._handleOnFocus}  suffix2="M2" value2={project.undergroundArea}/>
               <TextField2  label = "地上樓層" id="dergroundNum" name="dergroundNum" type="number" id2="dergroundArea" name2="dergroundArea"
                      onChange={this.props.fileChange.bind(null,'dergroundNum')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                      onFocus={this._handleOnFocus}  suffix="層" value1={project.dergroundNum}
                      onChange2={this.props.fileChange.bind(null,'dergroundArea')} onEnterKeyDown2={this._handleOnEnterKeyDown.bind(null,1)}
                      onFocus2={this._handleOnFocus}  suffix2="M2" value2={project.dergroundArea}/>
            </div>

            <div className="form-row">
              <TextField2  label = "屋突樓層" id="roofNum" name="roofNum" type="number" id2="roofArea" name2="roofArea"
                     onChange={this.props.fileChange.bind(null,'roofNum')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus={this._handleOnFocus}  suffix="層" value1={project.roofNum}
                     onChange2={this.props.fileChange.bind(null,'roofArea')} onEnterKeyDown2={this._handleOnEnterKeyDown.bind(null,1)}
                     onFocus2={this._handleOnFocus}  suffix2="M2" value2={project.roofArea}/>

            </div>

          </form>
      </div>

    )
  },
  _handleOnEnterKeyDown:function(nextNum,e){
    e.preventDefault();
    // $('#mui-id-'+nextNum).focus();
  },

  _handleFormateDate:function(date){
    var result;
    if(date){
      var month = '/' + (date.getMonth() + 1);
      var day = '/' + date.getDate();
      var year = date.getFullYear();
      result = year+month+day;
    }

    return result;
  },

    _handleOnFocus:function(e){

    },
})

module.exports = ProjectForm;
