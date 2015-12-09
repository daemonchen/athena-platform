import React, {Component} from 'react';
import {connect} from 'react-redux';
import auth from '../utils/auth';
import history from '../utils/history';
import {requestAddTemplate, requestTemplate, requestUpdateTemplate} from '../actions/template';

class Template extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.html = null;
    this.css = null;
    this.js = null;
  }

  componentDidMount() {
    const {params} = this.props;
    let templateId = params.templateId;

    if (!templateId) { //add new
      if (!auth.loggedIn()) {
        history.replaceState(null, '/login');
      }

      this.renderEditor();
    } else {
      const {dispatch} = this.props;
      dispatch(requestTemplate(templateId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {params, template} = this.props;
    let templateId = params.templateId;

    if (templateId) {
      if (templateId !== nextProps.params.templateId) {
        dispatch(requestTemplate(nextProps.params.templateId));
      }
    }
  }

  componentDidUpdate(nextProps) {
    const {params, template} = this.props;
    let templateId = params.templateId;

    if (templateId) {
      if (template) {
        this.refs.templateName.value = template.name;
        this.renderEditor(template.html, template.css, template.js);
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let templateName = this.refs.templateName.value;
    if (templateName === '') {
      return false;
    }

    const {dispatch, params} = this.props;
    if (params.templateId) { //更新模版
      dispatch(requestUpdateTemplate({
        templateId: params.templateId,
        templateName: templateName,
        html: this.html.getValue(),
        js: this.js.getValue(),
        css: this.css.getValue()
      }, '/templates'));
    } else {
      dispatch(requestAddTemplate({
        templateName: templateName,
        html: this.html.getValue(),
        js: this.js.getValue(),
        css: this.css.getValue()
      }, '/templates'));
    }
  }

  componentWiilUnmount() {
    this.html.destroy();
    this.css.destroy();
    this.js.destroy();
  }

  renderEditor(html = '', css = '', js = '') {
    this.html = ace.edit("html");
    this.html.getSession().setMode("ace/mode/html");
    this.html.session.setOptions({
      tabSize: 2,
      useSoftTabs: true
    });
    this.html.$blockScrolling = Infinity;
    this.html.setValue(html, -1);
    this.css = ace.edit("css");
    this.css.getSession().setMode('ace/mode/css');
    this.css.session.setOptions({
      tabSize: 2,
      useSoftTabs: true
    });
    this.css.$blockScrolling = Infinity;
    this.css.setValue(css, -1);
    this.js = ace.edit("js");
    this.js.getSession().setMode('ace/mode/javascript');
    this.js.session.setOptions({
      tabSize: 2,
      useSoftTabs: true
    });
    this.js.$blockScrolling = Infinity;
    this.js.setValue(js, -1);
  }

  render() {
    return (
      <div className="row template">
        <div className="input-field col s12">
          <input type="text" placeholder="模板名称" ref="templateName" className="validate" required/>
        </div>
        <div className="input-field col s12 editor">
          <h4>index.html</h4>
          <div id="html" className="z-depth-1"></div>
        </div>
        <div className="input-field col s12 editor">
          <h4>gb.css</h4>
          <div id="css" className="z-depth-1"></div>
        </div>
        <div className="input-field col s12 editor">
          <h4>gb.js</h4>
          <div id="js" className="z-depth-1"></div>
        </div>
        {auth.loggedIn() &&
          <div className="input-field col s12">
            <button onClick={this.handleSubmit} className="waves-effect waves-light btn">Save</button>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {template} = state;

  return {
    template: template.template
  };
}

export  default connect(mapStateToProps)(Template);
