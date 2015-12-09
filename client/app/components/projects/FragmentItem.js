import React, {Component} from 'react';
import Moment from 'moment';

export default class FragmentItem extends Component {
  render() {
    const {fragment} = this.props;
    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">filter_frames</i>{fragment.fragment}</div>
        <div className="collapsible-body">
          <p><span className="def">page: </span>{fragment.name}</p>
          <p><span className="def">module: </span>{fragment.module.name}</p>
          <p><span className="def">author: </span>{fragment.author}</p>
          <p><span className="def">created: </span>{Moment(fragment.createTime).fromNow()}</p>
        </div>
      </li>
    );
  }
}
