import React, {Component} from 'react';

export default class CssItem extends Component {
  render() {
    const {css} = this.props;

    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">style</i>{css.name}</div>
        <div className="collapsible-body">
          <p><span className="def">模块: </span>{css.module.name}</p>
          {css.revision &&
            <p><span className="def">线上版本: </span>{css.revision}</p>
          }
          {css.loadedBy && css.loadedBy.length >= 0 &&
            <p><span className="def">被引用: </span>{css.loadedBy.length} 次</p>
          }
          {css.loadedBy && css.loadedBy.length > 0 &&
            <ul className="collection inline">
              {css.loadedBy.map(page => {
                return <li className="collection-item" key={page._id}>{page.module.name}/{page.name}.html</li>;
              })}
            </ul>
          }
          {css.images && css.images.length > 0 &&
            <p><span className="def">引用了图片: </span></p>
          }
          {css.images && css.images.length > 0 &&
            <ul className="collection inline">
              {css.images.map(image => {
                return <li className="collection-item" key={image._id}>{image.name}</li>;
              })}
            </ul>
          }
        </div>
      </li>
    );
  }
}
