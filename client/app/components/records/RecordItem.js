import React, {Component} from 'react';
import {Link} from 'react-router';
import Moment from 'moment';

export default class RecordItem extends Component {
  render() {
    const {record} = this.props;
    let item = '';

    switch (record.cmd) {
    case 'app':
      item = (
        <div className="detail">
          <a href="#">{record.author}</a> 创建了项目 <Link to={`/project/${record.app._id}`}>{record.app.name}</Link>
          <p className="cmd">cmd: <i className="material-icons">apps</i></p>
          <p>appid: {record.app._id}</p>
        </div>
      );
      break;
    case 'module':
      item = (
        <div className="detail">
          <a href="#">{record.author}</a> 在项目 <Link to={`/project/${record.app._id}`}>{record.app.name}</Link> 中添加了模块 <strong>{record.module.name}</strong>
          <p className="cmd">cmd: <i className="material-icons">view_module</i></p>
          <p>appid: {record.app._id}</p>
        </div>
      );
      break;
    case 'page':
      item = (
        <div className="detail">
          <a href="#">{record.author}</a> 在项目 <Link to={`/project/${record.app._id}`}>{record.app.name}</Link> 的模块 <strong>{record.module.name}</strong> 中添加了页面 <strong>{record.args}</strong>
          <p className="cmd">cmd: <i className="material-icons">pages</i></p>
          <p>appid: {record.app._id}</p>
        </div>
      );
      break;
    case 'widget':
      item = (
        <div className="detail">
          <a href="#">{record.author}</a> 在项目 <Link to={`/project/${record.app._id}`}>{record.app.name}</Link> 的模块 <strong>{record.module.name}</strong> 中添加了组件 <strong>{record.args}</strong>
          <p className="cmd">cmd: <i className="material-icons">widgets</i></p>
          <p>appid: {record.app._id}</p>
        </div>
      );
      break;
    default:
      item = (
        <div className="detail">
          <a href="#">{record.author}</a> {record.cmd} <Link to={`/project/${record.app._id}`}>{record.app.name}</Link> {record.module && record.module.name}
          <p className="cmd">cmd: {record.cmd}</p>
          <p>appid: {record.app._id}</p>
        </div>
      );
      break;
    }

    return (
      <div className="record-item">
        <small className="created">{Moment(record.createTime).fromNow()}</small>
        {item}
      </div>
    );
  }
};
