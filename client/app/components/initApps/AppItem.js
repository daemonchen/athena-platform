import React, {Component} from 'react';
import Moment from 'moment';

export default class AppItem extends Component {
  render() {
    const {app} = this.props;

    console.log(app);
    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">apps</i>{app.name}</div>
        <div className="collapsible-body">
          <p><span className="def">author: </span>{app.author.name}</p>
          <p><span className="def">template: </span>{app.template.name}</p>
          <p><span className="def">preview: </span>
            <span className="prerelation">host: {app.preview.host}</span>
            <span className="prerelation">port: {app.preview.port}</span>
            <span className="prerelation">user: {app.preview.user}</span>
            <span className="prerelation">pass: {app.preview.pass}</span>
          </p>

          <p><span className="def">created: </span>{Moment(app.createTime).fromNow()}</p>
        </div>
      </li>
    );
  }
}
