import React, {Component} from 'react';
import Moment from 'moment';

export default class WidgetItem extends Component {
  render() {
    const {widget, showModel} = this.props;
    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">widgets</i>{widget.name}</div>
        <div className="collapsible-body">
          {widget.preview && widget.preview !== '' &&
            <p><span className="def">预览: </span><a href={widget.preview} target="_blank"><i className="material-icons widget-preview">remove_red_eye</i></a></p>
          }
          {showModel &&
            <p><span className="def">模块: </span>{widget.module.name}</p>
          }
          <p><span className="def">创建者: </span>{widget.author}</p>
          <p><span className="def">创建时间: </span>{Moment(widget.createTime).fromNow()}</p>
          {widget.loadedBy && widget.loadedBy.length >= 0 &&
            <p><span className="def">被引用了: </span>{widget.loadedBy.length} 次</p>
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
