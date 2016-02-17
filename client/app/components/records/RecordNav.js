import React, {Component} from 'react';
import {Link} from 'react-router';

export default class RecordNav extends Component {
  render() {
    const {appid, author} = this.props;
    let params = {appid: appid};

    if (author && author !== '') {
      params.author = author;
    }
    return (
      <div className="record-nav">
        <Link to={`/records/all`} query={params} className={'waves-effect waves-light' + (this.props.root ? ' active' : '')} activeClassName="active"><i className="material-icons left">select_all</i>All</Link>
        <Link to={`/records/app`} query={params} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">apps</i>App</Link>
        <Link to={`/records/module`} query={params} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">view_module</i>Module</Link>
        <Link to={`/records/page`} query={params} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">pages</i>Page</Link>
        <Link to={`/records/widget`} query={params} className="waves-effect waves-light" activeClassName="active"><i className="material-icons left">widgets</i>Widget</Link>
      </div>
    );
  }
}
