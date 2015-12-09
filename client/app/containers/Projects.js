import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainSection from '../components/projects/Projects';
import Sidebar from '../components/Sidebar';
import {requestProjects} from '../actions/projects';

class Projects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestProjects());
  }

  render() {
    const {projects, location} = this.props;
    return (
      <div className="row">
        <div className="col s9">
          {this.props.children ||
            <MainSection page={location.query.page} projects={projects}/>
          }
        </div>
        <div className="col s3">
          <Sidebar url="/project/" appid={this.props.params.projectId} type='app' projects={projects}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {projects} = state;

  return {
    projects: projects.projects
  };
}

export default connect(mapStateToProps)(Projects);
