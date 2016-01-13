import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppItem from '../components/initApps/AppItem';
import {requestAllApps} from '../actions/initApp';

class InitApps extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, children} = this.props;
    if (!children) {
      dispatch(requestAllApps());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {children, dispatch} = this.props;
    if (children && !nextProps.children) {
      dispatch(requestAllApps());
    }
  }

  render() {
    const {children, apps} = this.props;
    return (
      <div>
      {children ||
        <div>
           <Link to={`/project_add`} className="waves-effect waves-light btn"><i className="material-icons left">add_circle_outline</i>新建项目</Link>
           <ul className="collapsible initapps" data-collapsible="expandable">
             {apps.map(app => {
               return <AppItem key={app._id} app={app}/>;
             })}
           </ul>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {initApps} = state;
  return {
    apps: initApps.apps
  };
}

export default connect(mapStateToProps)(InitApps);
