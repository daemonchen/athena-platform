import React, {Component} from 'react';
import Moment from 'moment';

export default class FragmentItem extends Component {
  render() {
    const {fragment} = this.props;
    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">filter_frames</i>{fragment.fragment}</div>
        <div className="collapsible-body">
          <p><span className="def">页面: </span>{fragment.name}</p>
          <p><span className="def">模块: </span>{fragment.module.name}</p>
          <p><span className="def">创建者: </span>{fragment.author}</p>
          <p><span className="def">创建时间: </span>{Moment(fragment.createTime).fromNow()}</p>
        </div>
      </li>
    );
  }
}
