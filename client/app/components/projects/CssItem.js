import React, {Component} from 'react';

export default class CssItem extends Component {
  render() {
    const {css} = this.props;

    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">style</i>{css.name}</div>
        <div className="collapsible-body">
          <p><span className="def">module: </span>{css.module.name}</p>
          {css.revision &&
            <p><span className="def">revision: </span>{css.revision}</p>
          }
          {css.loadedBy && css.loadedBy.length >= 0 &&
            <p><span className="def">loadedBy: </span>{css.loadedBy.length} times</p>
          }
          {css.loadedBy && css.loadedBy.length > 0 &&
            <ul className="collection inline">
              {css.loadedBy.map(page => {
                return <li className="collection-item" key={page._id}>{page.module.name}/{page.name}.html</li>;
              })}
            </ul>
          }
          {css.images && css.images.length > 0 &&
            <p><span className="def">images: </span></p>
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
