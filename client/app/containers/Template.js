import React, {Component} from 'react';
import {connect} from 'react-redux';
import auth from '../utils/auth';
import history from '../utils/history';
import {requestAddTemplate, requestTemplate, requestUpdateTemplate, requestGetPageContent} from '../actions/template';

class Template extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.editor = null;
    this.templateId = '';
    this.state = {page: 'gb.html'};
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    const {params, dispatch} = this.props;
    let templateId = params.templateId;
    this.templateId = templateId;

    if (!templateId) { //add new
      if (!auth.loggedIn()) {
        history.replaceState(null, '/login');
      }
    } else {
      dispatch(requestTemplate(templateId));
    }

    this.renderEditor(this.props.content);
    dispatch(requestGetPageContent(this.state.page, this.templateId));
  }

  componentWillReceiveProps(nextProps) {
    const {params, template, dispatch} = this.props;
    let templateId = params.templateId;

    if (templateId) {
      if (templateId !== nextProps.params.templateId) {
        dispatch(requestTemplate(nextProps.params.templateId));
      }
    } else {
      if (nextProps.params.templateId !== nextProps.template._id) {
        dispatch(requestTemplate(nextProps.params.templateId));
      }
    }

    this.templateId = templateId;
  }

  componentDidUpdate() {
    const {params, template} = this.props;
    let templateId = params.templateId;

    if (templateId) {
      if (template) {
        this.refs.templateName.value = template.name;
      }
    }

    this.renderEditor(this.props.content);
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
        content: this.editor.getValue(),
        file: this.state.page
      }, function() {
        let tip = this.refs.tip;
        tip.style.display = 'inline';
        setTimeout(function() {
          tip.style.display = 'none';
        }, 2000);
      }.bind(this)));
    } else {
      dispatch(requestAddTemplate({
        templateName: templateName,
        content: this.editor.getValue(),
        file: this.state.page
      }, '/template/'));
    }
  }

  componentWiilUnmount() {
    this.editor.destroy();
  }

  renderEditor(content = '') {
    const {page} = this.state;
    let mode = 'mode';
    if (page.endsWith('html')) {
      mode = 'html';
    }
    if (page.endsWith('css')) {
      mode = 'css';
    }
    if (page.endsWith('js')) {
      mode = 'javascript';
    }
    this.editor = this.editor || ace.edit('editor');
    this.editor.getSession().setMode('ace/mode/' + mode);
    this.editor.session.setOptions({
      tabSize: 2,
      useSoftTabs: true
    });
    this.editor.$blockScrolling = Infinity;
    this.editor.setValue(content, -1);
  }

  setPage(page, e) {
    const {dispatch} = this.props;
    if (page !== this.state.page) {
      this.setState({page: page});
      dispatch(requestGetPageContent(page, this.templateId));
    }
  }

  render() {
    const {page} = this.state;
    return (
      <div className="row template">
        <div className="col s3">
          <ul className="template-folder">
            <li>
              <h4 className="folder"><i className="material-icons left">folder_open</i>app</h4>
              <ul className="files">
                <li className={page === 'gb.html' ? 'active' : ''} onClick={this.setPage.bind(null, 'gb.html')}><i className="material-icons">insert_drive_file</i>gb.html</li>
                <li className={page === 'gb.css' ? 'active' : ''} onClick={this.setPage.bind(null, 'gb.css')}><i className="material-icons">insert_drive_file</i>gb.css</li>
                <li className={page === 'gb.js' ? 'active' : ''} onClick={this.setPage.bind(null, 'gb.js')}><i className="material-icons">insert_drive_file</i>gb.js</li>
                <li className={page === 'common.scss' ? 'active' : ''} onClick={this.setPage.bind(null, 'common.scss')}><i className="material-icons">insert_drive_file</i>common.scss</li>
              </ul>
            </li>
            <li>
              <h4 className="folder"><i className="material-icons left">folder_open</i>page</h4>
              <ul className="files">
                <li className={page === 'page.html' ? 'active' : ''} onClick={this.setPage.bind(null, 'page.html')}><i className="material-icons">insert_drive_file</i>page.html</li>
                <li className={page === 'page.css' ? 'active' : ''} onClick={this.setPage.bind(null, 'page.css')}><i className="material-icons">insert_drive_file</i>page.css</li>
                <li className={page === 'page.js' ? 'active' : ''} onClick={this.setPage.bind(null, 'page.js')}><i className="material-icons">insert_drive_file</i>page.js</li>
              </ul>
            </li>
            <li>
              <h4 className="folder"><i className="material-icons left">folder_open</i>widget</h4>
              <ul className="files">
                <li className={page === 'widget.html' ? 'active' : ''} onClick={this.setPage.bind(null, 'widget.html')}><i className="material-icons">insert_drive_file</i>widget.html</li>
                <li className={page === 'widget.css' ? 'active' : ''} onClick={this.setPage.bind(null, 'widget.css')}><i className="material-icons">insert_drive_file</i>widget.css</li>
                <li className={page === 'widget.js' ? 'active' : ''} onClick={this.setPage.bind(null, 'widget.js')}><i className="material-icons">insert_drive_file</i>widget.js</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="col s9">
          <div className="input-field col s12">
            <input type="text" placeholder="模板名称" ref="templateName" className="validate" required/>
          </div>
          <div className="input-field col s12 editor">
            <h4>{page}</h4>
            <div id="editor" className="z-depth-1"></div>
          </div>
        {auth.loggedIn() &&
          <div className="input-field col s12">
            <button onClick={this.handleSubmit} className="waves-effect waves-light btn">Save</button><span ref="tip" className="tip"> 更新成功</span>
          </div>
        }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {template} = state;

  return {
    template: template.template,
    content: template.content
  };
}

export default connect(mapStateToProps)(Template);
