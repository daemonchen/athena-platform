import React, {Component} from 'react';
import {Link} from 'react-router';
import Moment from 'moment';
import auth from '../../utils/auth';

export default class ProjectDesc extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {edit: false};
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleUpdateMembers(this.refs.members.value);
    this.state.edit = false;
  }

  render() {
    let {project} = this.props;
    let members = project.members.join(',');

    if (members === '') {
      members = project.author;
    }
    return (
      <li className="appdesc">
        <div className="collapsible-header active"><i className="material-icons">apps</i><Link to={`/project/` + project._id}>{project.name}</Link></div>
        <div className="collapsible-body">
          <form onSubmit={this.handleSubmit}>
            {project.preview &&
              <p>预览：<a href={project.preview} target="_blank"><i className="material-icons widget-preview">remove_red_eye</i></a></p>
            }
            <p>标示符: {project._id}</p>
            <p>创建者: {project.author}</p>
            <p>创建时间: {Moment(project.createTime).fromNow()}</p>
            <p>成员: <span>{members} </span>
              {auth.loggedIn() &&
                <i className="material-icons" onClick={this.handleClick}>edit</i>
              }
              {this.state.edit &&
                <input type="text" placeholder="输入可发布的名字，用,(英文状态下)隔开" className="members" ref="members"/>
              }
            </p>
          </form>
        </div>
      </li>
    );
  }
}

