import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestTemplates} from '../actions/template';
import {requestAddPrject} from '../actions/initApp';
import {resetError} from '../actions/resetError';

class AddProject extends Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.addDeploy = this.addDeploy.bind(this);
      this.deleteDeploy = this.deleteDeploy.bind(this);
      this.getDeploys = this.getDeploys.bind(this);
      this.selected = '';
      this.deployId = 1;
      this.state = {deploy: []};
    }

    componentDidMount() {
      const {dispatch} = this.props;
      dispatch(requestTemplates(true));
      dispatch(resetError());
    }

    handleSubmit(e) {
      e.preventDefault();
      const {dispatch} = this.props;

      if (this.refs.template.value === '') {
        alert('please select template');
        return;
      }

      if (this.refs.pro_name.value === '') {
        return;
      }

      this.selected = this.refs.template.value;

      dispatch(requestAddPrject({
        pro_name: this.refs.pro_name.value,
        template: this.refs.template.value,
        preview: {
          host: this.refs.host.value,
          port: this.refs.port.value,
          user: this.refs.user.value,
          pass: this.refs.pass.value,
          fdPath: this.refs.fdPath.value,
          domain: this.refs.domain.value,
          remotePath: this.refs.remotePath.value
        },
        deploys: this.getDeploys()
      }, '/initapps'));
    }

    componentDidUpdate(nextProps) {
      $('select').material_select();
    }

    getDeploys() {
      var deploys = this.state.deploy;
      var machines = {};

      deploys.forEach(id => {
        machines[this.refs['deploy' + id].value] = {
          host: this.refs['host' + id].value,
          port: this.refs['port' + id].value,
          user: this.refs['user' + id].value,
          pass: this.refs['pass' + id].value,
          fdPath: this.refs['fdPath' + id].value,
          domain: this.refs['domain' + id].value,
          remotePath: this.refs['remotePath' + id].value,
          cssi: this.refs['cssi' + id].value,
          assestPrefix: this.refs['assestPrefix' + id].value,
          shtmlPrefix: this.refs['shtmlPrefix' + id].value
        };
      });

      return machines;
    }

    addDeploy() {
      let deploy = this.state.deploy;
      deploy.push(this.deployId++);
      this.selected = this.refs.template.value;

      this.setState({deploy: deploy});
    }

    deleteDeploy(id) {
      var deploy = this.state.deploy;
      deploy.splice(deploy.indexOf(id), 1);
      this.selected = this.refs.template.value;
      this.setState({deploy: deploy});
    }

    renderDeployForm(id) {
      return (
        <div className="row" key={id}>
          <div className="input-field col s8">
            <input type="text" ref={'deploy' + id} id={'deploy' + id} required className="validate"/>
            <label htmlFor={'deploy' + id}>机器名称(用英文)</label>
          </div>
          <div className="input-field col s4">
            <a className="btn-floating waves-effect waves-light red" onClick={this.deleteDeploy.bind(null, id)}><i className="material-icons">close</i></a>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'host' + id} id={'deploy' + id} className="validate"/>
            <label htmlFor={'host' + id}>host (主机)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'port' + id} id={'port' + id} className="validate" />
            <label htmlFor={'port' + id}>port (端口号)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'user' + id} id={'user' + id} className="validate"/>
            <label htmlFor={'user' + id}>user (用户名)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'pass' + id} id={'pass' + id} className="validate" />
            <label htmlFor={'pass' + id}>pass (密码)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'fdPath' + id} id={'fdPath' + id} className="validate"/>
            <label htmlFor={'fdPath' + id}>fdPath (ftp目录)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'domain' + id} id={'domain' + id} className="validate" />
            <label htmlFor={'domain' + id}>domain (域名)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'remotePath' + id} id={'remotePath' + id} className="validate"/>
            <label htmlFor={'remotePath' + id}>remotePath (域名访问路径)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'cssi' + id} id={'cssi' + id} className="validate" />
            <label htmlFor={'cssi' + id}>cssi (ssi存放目录)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'assestPrefix' + id} id={'assestPrefix' + id} className="validate"/>
            <label htmlFor={'assestPrefix' + id}>assestPrefix (静态文件访问路径)</label>
          </div>
          <div className="input-field col s6">
            <input type="text" ref={'shtmlPrefix' + id} id={'shtmlPrefix' + id} className="validate" />
            <label htmlFor={'shtmlPrefix' + id}>shtmlPrefix (ssi访问路径)</label>
          </div>
      </div>
      );
    }

    render() {
      const {templates} = this.props;
      return (
        <div className="project-add">
          <h4>创建项目</h4>
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input id="pro_name" type="text" required ref="pro_name" className="validate" />
                  <label htmlFor="pro_name">项目名称</label>
                </div>
                <div className="input-field col s6">
                  <select value={this.selected} ref="template">
                    <option value="" disabled>选择您需要的模板</option>
                    {templates.map(template => {
                      return <option key={template._id} value={template._id}>{template.name}</option>;
                    })}
                  </select>
                  <label>模板</label>
                </div>
              </div>
              <div className="row">
                <h5>预览机（preview）</h5>
                <div className="input-field col s6">
                  <input type="text" id="host" ref="host" required className="validate"/>
                  <label htmlFor="host">host (主机)</label>
                </div>
                <div className="input-field col s6">
                  <input type="text" id="host" ref="port" required className="validate" />
                  <label htmlFor="port">port (端口)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="text" id="user" ref="user" required className="validate"/>
                <label htmlFor="user">user (用户名)</label>
              </div>
              <div className="input-field col s6">
                <input type="text" id="pass" ref="pass" required className="validate"/>
                <label htmlFor="pass">pass (密码)</label>
              </div>
              <div className="input-field col s6">
                <input type="text" id="fdPath" ref="fdPath" required className="validate"/>
                <label htmlFor="fdPath">fdPath (ftp路径)</label>
              </div>
              <div className="input-field col s6">
                <input type="text" id="domain" ref="domain" required className="validate"/>
                <label htmlFor="domain">domain (域名)</label>
              </div>
              <div className="input-field col s8">
                <input type="text" id="remotePath" ref="remotePath" required className="validate"/>
                <label htmlFor="remotePath">remotePath (域名访问路径)</label>
              </div>
              <div className="input-field col s4">
                <a className="btn-floating waves-effect waves-light" onClick={this.addDeploy}><i className="material-icons">add</i></a>
              </div>
            </div>
            {this.state.deploy.map(id => {
              return this.renderDeployForm(id);
            })}
            <div className="row error">
              {this.props.errorMessage}
            </div>
            <div className="row">
              <button type="submit" className="btn waves-effect waves-light">添加</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {template, errorMessage} = state;
  return {
    templates: template.templates,
    errorMessage
  };
}

export default connect(mapStateToProps)(AddProject);
