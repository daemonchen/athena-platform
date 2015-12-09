import React, {Component} from 'react';

export default class JsItem extends Component {
  render() {
    const {js} = this.props;

    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">toys</i>{js.name}</div>
        <div className="collapsible-body">
          <p><span className="def">module: </span>{js.module.name}</p>
          {js.revision &&
            <p><span className="def">revision: </span>{js.revision}</p>
          }
          {js.loadedBy && js.loadedBy.length >= 0 &&
            <p><span className="def">loadedBy: </span>{js.loadedBy.length} times</p>
          }
          {js.loadedBy && js.loadedBy.length > 0 &&
            <ul className="collection inline">
              {js.loadedBy.map(page => {
                return <li className="collection-item" key={page._id}>{page.module.name}/{page.name}.html</li>;
              })}
            </ul>
          }
        </div>
      </li>
    );
  }
}

