import React, {Component} from 'react';
import ProjectItems from './ProjectItems';
import Pagination from '../Pagination';
import {PROJECTS_NUM} from '../../constants/Config';

export default class Projects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {projects, page = 1} = this.props;

    if (!projects) {
      return null;
    }

    let count = Math.ceil(projects.length / PROJECTS_NUM);
    let current = parseInt(page, 10);

    if (page < 1) {
      current = 1;
    }

    if (page > count) {
      current = count;
    }

    let pagination = {
      current: current,
      count: count
    };

    let apps = projects.slice((current - 1) * PROJECTS_NUM, current * PROJECTS_NUM);

    return (
      <div>
        <ProjectItems projects={apps} page={current}/>
        {projects && projects.length > 0 &&
          <Pagination url="/projects" pagination={pagination}/>
        }
      </div>
    );
  };
}
