import React, {Component} from 'react';
import Moment from 'moment';
import PageItem from './PageItem';
import WidgetItem from './WidgetItem';

export default class ModuleItem extends Component {
  render() {
    const {item, type, index} = this.props;
    return (
      <li>
        <div className={'collapsible-header' + (index === 0 ? ' active' : '')}><i className="material-icons">view_module</i>{item.name}</div>
        <div className="collapsible-body">
          <p>author: {item.author}</p>
          <p>created: {Moment(item.createTime).fromNow()}</p>
          <p>compressed: {(item.css_compress || 0) + (item.js_compress || 0) + (item.img_compress || 0)} bytes
          </p>
          <ul className="mod-compress">
            <li>css: optimize {item.css_compress || 0} bytes</li>
            <li>js: optimize {item.js_compress || 0} bytes</li>
            <li>img: optimize {item.img_compress || 0} bytes</li>
          </ul>
          {type === 'page' && item.pages && item.pages.length > 0 &&
            <ul className="collapsible pages" data-collapsible="expandable">
              {item.pages.map(page => {
                return <PageItem key={page._id} page={page}/>
              })}
            </ul>
          }
          {type === 'widget' && item.widgets && item.widgets.length > 0 &&
            <ul className="collapsible widgets" data-collapsible="expandable">
              {item.widgets.map(widget => {
                return <WidgetItem key={widget._id} widget={widget}/>
              })}
            </ul>
          }

        </div>
      </li>
    );
  }
}
