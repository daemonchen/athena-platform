import React, {Component} from 'react';

export default class CssItem extends Component {
  render() {
    const {image} = this.props;

    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">style</i>{image.name}</div>
        <div className="collapsible-body">
          <p><span className="def">module: </span>{image.module.name}</p>
          {image.revision &&
            <p><span className="def">revision: </span>{image.revision}</p>
          }
          {image.loadedByPage && image.loadedByPage.length >= 0 &&
            <p><span className="def">loaded By Page: </span>{image.loadedByPage.length} times</p>
          }
          {image.loadedByPage && image.loadedByPage.length > 0 &&
            <ul className="collection inline">
              {image.loadedByPage.map(page => {
                return <li className="collection-item" key={page._id}>{page.module.name}/{page.name}.html</li>;
              })}
            </ul>
          }
          {image.loadedByCss && image.loadedByCss.length >= 0 &&
            <p><span className="def">loaded By Css: </span>{image.loadedByCss.length} times</p>
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

