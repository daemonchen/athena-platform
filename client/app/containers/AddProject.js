import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestTemplates} from '../actions/template';
import {requestAddPrject} from '../actions/initApp';
import {resetError} from '../actions/resetError';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selected = '';
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestTemplates());
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
      host: this.refs.host.value,
      port: this.refs.port.value,
      user: this.refs.user.value,
      pass: this.refs.pass.value
    }, '/initapps'));
  }

  componentDidUpdate(nextProps) {
    $('select').material_select();
  }

  render() {
    const {templates} = this.props;
    return (
      <div className="project-add">
        <h4>Create Project</h4>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="pro_name" type="text" required ref="pro_name" className="validate" />
                <label htmlFor="pro_name">Project Name</label>
              </div>
              <div className="input-field col s6">
                <select value={this.selected} ref="template">
                  <option value="" disabled>Choose your Template</option>
                  {templates.map(template => {
                    return <option key={template._id} value={template._id}>{template.name}</option>;
                  })}
                </select>
                <label>Template Select</label>
              </div>
            </div>
            <div className="row">
              <h5>preview</h5>
              <div className="input-field col s6">
                <input type="text" id="host" ref="host" required className="validate"/>
                <label htmlFor="host">Host</label>
              </div>
              <div className="input-field col s6">
                <input type="text" id="host" ref="port" required className="validate" />
                <label htmlFor="port">Port</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="text" id="user" ref="user" required className="validate"/>
                <label htmlFor="user">User</label>
              </div>
              <div className="input-field col s6">
                <input type="text" id="pass" ref="pass" required className="validate"/>
                <label htmlFor="pass">Pass</label>
              </div>
            </div>
            <div className="row error">
              {this.props.errorMessage}
            </div>
            <div className="row">
              <button type="submit" className="btn waves-effect waves-light">Submit</button>
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
