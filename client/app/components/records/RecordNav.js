import React, {Component} from 'react';
import {Link} from 'react-router';

export default class RecordNav extends Component {
  render() {
    const {appid} = this.props;
    return (
      <div className="record-nav">
        <Link to={`/records/all`} query={{appid: appid}} className={'waves-effect waves-light' + (this.props.root ? ' active' : '')} activeClassName="active"><i className="material-icons left">select_all</i>All</Link>
        <Link to={`/records/app`} query={{appid: appid}} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">apps</i>App</Link>
        <Link to={`/records/module`} query={{appid: appid}} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">view_module</i>Module</Link>
        <Link to={`/records/page`} query={{appid: appid}} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">pages</i>Page</Link>
        <Link to={`/records/widget`} query={{appid: appid}} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">widgets</i>Widget</Link>
      </div>
    );
  }
}
