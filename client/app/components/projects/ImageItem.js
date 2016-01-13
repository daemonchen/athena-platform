import React, {Component} from 'react';

export default class CssItem extends Component {
  render() {
    const {image} = this.props;

    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">style</i>{image.name}</div>
        <div className="collapsible-body">
          <p><span className="def">模块: </span>{image.module.name}</p>
          {image.revision &&
            <p><span className="def">线上版本: </span>{image.revision}</p>
          }
          {image.loadedByPage && image.loadedByPage.length >= 0 &&
            <p><span className="def">被页面引用了: </span>{image.loadedByPage.length} 次</p>
          }
          {image.loadedByPage && image.loadedByPage.length > 0 &&
            <ul className="collection inline">
              {image.loadedByPage.map(page => {
                return <li className="collection-item" key={page._id}>{page.module.name}/{page.name}.html</li>;
              })}
            </ul>
          }
          {image.loadedByCss && image.loadedByCss.length >= 0 &&
            <p><span className="def">被css引用了: </span>{image.loadedByCss.length} 次</p>
          }
          {image.loadedByCss && image.loadedByCss.length > 0 &&
            <ul className="collection inline">
              {image.loadedByCss.map(css => {
                return <li className="collection-item" key={css._id}>{css.module.name}/{css.name}</li>;
              })}
            </ul>
          }
       </div>
      </li>
    );
  }
}

