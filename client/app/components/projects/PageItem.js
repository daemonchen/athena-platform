import React, {Component} from 'react';
import Moment from 'moment';

export default class PageItem extends Component {
  render() {
    const {page, showModel} = this.props;

    return (
      <li>
        <div className="collapsible-header active">
          <i className="material-icons">pages</i>{page.name}.html
        </div>
        <div className="collapsible-body">
          {showModel &&
            <p><span className="def">module: </span>{page.module.name}</p>
          }
          <p><span className="def">author: </span>{page.author}</p>
          <p><span className="def">created: </span>{Moment(page.createTime).fromNow()}</p>
          {page.widgets && page.widgets.length > 0 &&
            <p><span className="def">widgets: </span></p>
          }
          {page.widgets && page.widgets.length > 0 &&
            <ul className="collection inline">
              {page.widgets.map(widget => {
                return <li className="collection-item" key={widget._id}>{widget.module.name}/{widget.name}</li>;
              })}
            </ul>
          }
          {page.fragment &&
            <p><span className="def">fragment: </span>{page.fragment}</p>
          }
          {page.css && page.css.length > 0 &&
            <p><span className="def">css: </span></p>
          }
          {page.css && page.css.length > 0 &&
            <ul className="collection inline">
              {page.css.map(css => {
                let images = css.images && css.images.length > 0 && css.images.map(image => {
                  return <span key={image._id}>{image.name} </span>;
                });
                return <li className="collection-item" key={css._id}>{css.name} <span className="css-imgs">{images}</span></li>;
              })}
            </ul>
          }
          {page.js && page.js.length > 0 &&
            <p><span className="def">js: </span></p>
          }
          {page.js && page.js.length > 0 &&
            <ul className="collection inline">
              {page.js.map(js => {
                return <li className="collection-item" key={js._id}>{js.name}</li>;
              })}
            </ul>
          }
          {page.image && page.image.length > 0 &&
            <p><span className="def">images: </span></p>
          }
          {page.image && page.image.length > 0 &&
            <ul className="collection inline">
              {page.image.map(image => {
                return <li className="collection-item" key={image._id}>{image.name}</li>;
              })}
            </ul>
          }
        </div>
      </li>
    );
  }
}
