const React = require('react');
const ReactDOM = require('react-dom');
const ProjectForm = require('../../componets/ProjectForm');
const Breadcrumb = require("../../componets/Breadcrumb");
const ProjectList = require("../../componets/ProjectList");

const AddProject = React.createClass({
  getInitialState: function() {
   return {
     project:{},
     ProjectItems:[]

   };
 },

 componentDidMount: function() {

 },
 saveProject(project){
   this.setState({project:project});
   console.log(this.state.project);
 },
 saveProjectItems(item){
   var index = item.order;
   var ProjectItems = this.state.ProjectItems;
   ProjectItems[index] =item;
   this.setState({ProjectItems:ProjectItems});
 },

  render(){
    var project = this.state.project;
    var toolbar =[{name:'開新專案',clickFun:'addItem',icon:'icon-drive-file'},
                  {name:'儲存專案',clickFun:'updateItem',icon:'icon-save'},
                  {name:'另存專案',clickFun:'insertItem',icon:' icon-queue'}];
    return (
      <div>
      <Breadcrumb header="工程專案" toolbar={toolbar} addItem={this._handleAddItem} insertItem = {this._handleInsertItem} updateItem = {this._handleUpdateItem}/>
        <div className="listContainer card" z="5">
          <ProjectList setProject={this._handleChooseProject}/>
        </div>
        <div className="mainContainer card" z="5">
              <ProjectForm project={project}
                      fileChange={this._handleOnChange}
                      startDateChange = {this._handleStartDateOnChange}
                      completionDateChange = {this._handleStartDateOnChange}
                  />

        </div>
      </div>
    )
  },
  _handleAddItem(){

  },
  _handleInsertItem(){

  },
  _handleUpdateItem(){

  },
  _handleItemsChange(items){
    console.log(items)
    var project = this.state.project;
    this.setState({project:project,ProjectItems:items});
  },

  _handleSave:function(step,e){
    e.preventDefault();
    console.log('onclick')
    var project = this.state.project;



    this.setState({step:step});

  },
  _handleChooseProject:function(project){
    console.log(project);
    this.setState({project:project});
  },

  _handleOnChange:function(fileName,e){
    var project = this.state.project;
    project[fileName] = e.target.value;
    console.log(project);
    this.setState({project:project});
  },

  _handleStartDateOnChange:function(e,date){
    var project = this.state.project;
    project['startDate'] = date;
    console.log(project);
    this.setState({project:project});
  },

  _handleCompletionDateOnChange:function(e,date){
    var project = this.state.project;
    project['completionDate'] = date;
    console.log(project);
    this.setState({project:project});
  }


})
module.exports = AddProject;
