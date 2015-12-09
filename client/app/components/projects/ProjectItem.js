import React, {Component} from 'react';
import {Link} from 'react-router';
import Moment from 'moment';

export default class ProjectItem extends Component {
  render() {
    let {project} = this.props;
    return (
      <li>
        <div className="collapsible-header active"><i className="material-icons">apps</i><Link to={`/project/` + project._id}>{project.name}</Link></div>
        <div className="collapsible-body">
          <p>id: {project._id}</p>
          <p>author: {project.author}</p>
          <p>created: {Moment(project.createTime).fromNow()}</p>
        </div>
      </li>
    );
  }
}
