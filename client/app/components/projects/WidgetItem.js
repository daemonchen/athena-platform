import React, {Component} from 'react';
import Moment from 'moment';

export default class WidgetItem extends Component {
  render() {
    const {widget, showModel} = this.props;
    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">widgets</i>{widget.name}</div>
        <div className="collapsible-body">
          {showModel &&
            <p><span className="def">module: </span>{widget.module.name}</p>
          }
          <p><span className="def">author: </span>{widget.author}</p>
          <p><span className="def">created: </span>{Moment(widget.createTime).fromNow()}</p>
          {widget.loadedBy && widget.loadedBy.length >= 0 &&
            <p><span className="def">loadedBy: </span>{widget.loadedBy.length} times</p>
          }
          {widget.loadedBy && widget.loadedBy.length > 0 &&
            <ul className="collection inline">
              {widget.loadedBy.map(page => {
                return <li className="collection-item" key={page._id}>{page.module.name}/{page.name}.html</li>;
              })}
            </ul>
          }
        </div>
      </li>
    );
  }
}
