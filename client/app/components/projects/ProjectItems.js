import React, {Component} from 'react';
import ProjectItem from './ProjectItem';

export default class ProjectItems extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  componentDidUpdate() {
    $('.collapsible').collapsible();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.page !== nextProps.page) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    $('.collapsible').off('collapsible');
  }

  render() {
    let {projects} = this.props;

    return (
      <ul className="collapsible projects" data-collapsible="expandable">
        {projects && projects.length > 0 && projects.map(project => {
          return <ProjectItem key={project._id} project={project} />
        })}
      </ul>
    );
  }
}
