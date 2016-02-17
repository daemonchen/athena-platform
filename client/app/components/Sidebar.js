import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {projects: []};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.state.projects = this.props.projects.slice(0, 10);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projects.length !== nextProps.projects.length) {
      this.state.projects = nextProps.projects.slice(0, 10);
    }
  }

  handleChange(e) {
    e.preventDefault();
    const {projects} = this.props;
    let value = this.refs.search.value;
    let items = projects;
    if (value !== '') {
      items = projects.filter(project => {
        return project.name.indexOf(value) !== -1;
      });
    }

    items = items.slice(0, 10);
    this.setState({projects: items});
  }

  render() {
    const {url, appid, type, author} = this.props;
    let params = {};
    if (author && author !== '') {
      params.author = author;
    }
    return (
      <div className="sidebar">
        <div className="row search">
          <div className="input-field col s12">
            <input type="text" onChange={this.handleChange} ref="search"/>
            <i className="material-icons prefix" onClick={this.handleChange}>search</i>
          </div>
        </div>
        <div className="collection">
          {this.state.projects.map(project => {
            return <Link to={url + (type === 'app' ? '' : '?appid=') + project._id} query={params} key={project._id} className={'collection-item' + (appid === project._id ? ' active' : '')}>{project.name}</Link>;
          })}
        </div>
      </div>
    );
  }
}
