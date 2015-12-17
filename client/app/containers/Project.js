import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchForm from '../components/projects/SearchForm';
import SearchResult from '../components/projects/SearchResult';
import ProjectDesc from '../components/projects/ProjectDesc';
import ModuleItem from '../components/projects/ModuleItem';
import {requestProject, requestSearch, requestUpdateMembers} from '../actions/projects';

class Project extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.hideResult = this.hideResult.bind(this);
    this.handleUpdateMembers = this.handleUpdateMembers.bind(this);
    this.state = {isSearching: false};
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    let appid = params.projectId;

    if (appid) {
      dispatch(requestProject(appid));
    }
    $('ul.tabs').tabs();
    $('.tab-content').collapsible();
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, params} = this.props;

    if (nextProps.params.projectId && nextProps.params.projectId !== params.projectId) {
      dispatch(requestProject(nextProps.params.projectId));
      this.state.isSearching = false;
    }
  }

  componentDidUpdate(nextProps) {
    $('ul.tabs').tabs();
    $('.tab-content').collapsible();
    if (this.props.location.action === 'PUSH') {
      $('.tab-content').collapsible();
    }
  }

  handleUpdateMembers(value) {
    const {dispatch, params} = this.props;

    dispatch(requestUpdateMembers(params.projectId, value));
  }

  search(value) {
    const {dispatch, params} = this.props;
    let appid = params.projectId;

    if (appid) {
      this.state.isSearching = true;
      dispatch(requestSearch(appid, value));
    }
  }

  hideResult(e) {
    e.preventDefault();
    this.setState({isSearching: false});
  }

  render() {
    const {project, isFetching, result, errorMessage} = this.props;
    let hasResult = false;
    for (var key in result) {
      if (result[key]) {
        hasResult = true;
        break;
      }
    }

    return (
      <div className="project">
        <SearchForm search={this.search}/>
        {this.state.isSearching &&
          <div className="result">
            <div className="title">
              <i className="material-icons left">filter_list</i>
              <a href="javascript:void(0)">Result</a>
              <i className="material-icons right close" onClick={this.hideResult}>close</i>
            </div>
            <div className="result-content">
              {isFetching &&
                <div className="result-loading">{errorMessage || '正在拼命搜索中...'}</div>
              }
              {!isFetching && hasResult &&
                <SearchResult result={result} />
              }
              {!isFetching && !hasResult &&
                <div className="result-loading">搜索不到任何数据</div>
              }
            </div>
          </div>
        }
        {project._id &&
          <ul className="collapsible desc" data-collapsible="expandable">
            <ProjectDesc project={project} handleUpdateMembers={this.handleUpdateMembers}/>
          </ul>
        }
        <div className="row menu">
          <div className="col s12">
            <ul className="tabs z-depth-1">
              <li className="tab col"><a href="#pages"><i className="material-icons">pages</i> Pages</a></li>
              <li className="tab col"><a href="#widgets"><i className="material-icons">widgets</i> Widgets</a></li>
            </ul>
          </div>
        </div>
        <ul className="collapsible tab-content" id="pages" data-collapsible="expandable">
          {project.modules && project.modules.map((module, index) => {
            return <ModuleItem key={module._id} index={index} item={module} type="page"/>;
          })}
        </ul>
        <ul className="collapsible tab-content" id="widgets" data-collapsible="expandable">
          {project.modules && project.modules.map((module, index) => {
            return <ModuleItem key={module._id} item={module} index={index} type="widget"/>;
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {projects, errorMessage} = state;

  return {
    project: projects.project,
    isFetching: projects.isFetching,
    result: projects.result,
    errorMessage
  };
}

export default connect(mapStateToProps)(Project);
