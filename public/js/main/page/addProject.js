const React = require('react');
const ReactDOM = require('react-dom');
const ProjectForm = require('../componets/form/ProjectForm');
const Breadcrumb = require("../componets/breadcrumb/Breadcrumb");
const ProjectList = require("../componets/list/ProjectList");
const ajaxApi = require('../../../util/ajaxApi');

const AddProject = React.createClass({
  getInitialState: function() {
   return {
     project:{},
     selectIndex:null,
     projectList:[],
     query:""
   };
 },

 componentDidMount: function() {
   ajaxApi.projectDao('getAll',null,function(data){
     this.setState({projectList:data});
   }.bind(this));
 },
 getProjectLists:function(){
   ajaxApi.projectDao('getAll',null,function(data){
     this.setState({projectList:data});
   }.bind(this));
 },
  render(){
    var project = this.state.project;
    var lists = this.state.projectList;

    var toolbar =[{name:'開新專案',clickFun:'addProject',icon:'icon-drive-file'},
                  {name:'儲存專案',clickFun:'updateProject',icon:'icon-save'},
                  {name:'另存專案',clickFun:'insertProject',icon:' icon-queue'}];
    return (
      <div>
      <Breadcrumb header="工程專案" toolbar={toolbar} addProject={this._handleAddProject} insertProject = {this._handleInsertProject} updateProject = {this._handleUpdateProject}/>
        <div className="listContainer card" z="5">
          <ProjectList lists={lists} setProject={this._handleChooseProject} setQuery={this.setQueryListChange} selectIndex={this.state.selectIndex} value={this.state.query}/>
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
  _handleAddProject(){
    ajaxApi.projectDao('getAll',null,function(data){
      this.setState({project:{},selectIndex:null,projectList:data,query:''});
    }.bind(this));
  },
  _handleInsertProject(){
    var project = this.state.project;
    project.id='';
    ajaxApi.projectDao('createOrUpdate',project,function(data){
      this.setState({project:data,selectIndex:0});
      alert('新增成功');
      this.getProjectLists();
    }.bind(this));
  },
  _handleUpdateProject(){
    var project = this.state.project;
    var selectIndex = selectIndex||0;
    ajaxApi.projectDao('createOrUpdate',project,function(data){
      this.setState({project:data});
      alert('儲存成功');
      this.getProjectLists();
    }.bind(this));
  },
  _handleChooseProject:function(project,selectIndex){
    this.setState({project:project,selectIndex:selectIndex});
  },
  _handleOnChange:function(fileName,e){
    var project = this.state.project;
    project[fileName] = e.target.value;
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
    this.setState({project:project});
  },
  setQueryListChange:function(query){
    ajaxApi.projectDao('getLikeNameOrCode',{projectCode:query,projectName:query},function(data){
      this.setState({query:query,projectList:data});
    }.bind(this));
  }


})
module.exports = AddProject;
