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
          <p>创建者: {item.author}</p>
          <p>创建时间: {Moment(item.createTime).fromNow()}</p>
          <p>压缩了: {(item.css_compress || 0) + (item.js_compress || 0) + (item.img_compress || 0)} 字节
          </p>
          <ul className="mod-compress">
            <li>css: 压缩了 {item.css_compress || 0} 字节</li>
            <li>js: 压缩了 {item.js_compress || 0} 字节</li>
            <li>img: 压缩了 {item.img_compress || 0} 字节</li>
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
