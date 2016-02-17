import React, {Component} from 'react';
import Moment from 'moment';

export default class AppItem extends Component {
  showDeploys(deploys) {
    if (!deploys) {
      return null;
    }

    let data = [];
    let curr = {};
    for (let deploy in deploys) {
      curr = deploys[deploy];
      curr.name = deploy;
      data.push(curr);
    }

    return data.map(deploy => {
      return (
        <p key={deploy.name}><span className="def preview">{deploy.name}: </span>
          <span className="prerelation def">host: <span className="val">{deploy.host}</span></span>
          <span className="prerelation def">port: <span className="val">{deploy.port}</span></span>
          <span className="prerelation def">user: <span className="val">{deploy.user}</span></span>
          <span className="prerelation def">pass: <span className="val">{deploy.pass}</span></span>
          <span className="prerelation def">fdPath: <span className="val">{deploy.fdPath}</span></span>
          <span className="prerelation def">domain: <span className="val">{deploy.domain}</span></span>
          <span className="prerelation def">remotePath: <span className="val">{deploy.remotePath}</span></span>
          <span className="prerelation def">cssi: <span className="val">{deploy.cssi}</span></span>
          <span className="prerelation def">assestPrefix: <span className="val">{deploy.assestPrefix}</span></span>
          <span className="prerelation def">shtmlPrefix: <span className="val">{deploy.shtmlPrefix}</span></span>
        </p>
      );
    });
  }

  render() {
    const {app} = this.props;

    return (
      <li>
        <div className="collapsible-header"><i className="material-icons">apps</i>{app.name}</div>
        <div className="collapsible-body">
          <p><span className="def">创建者: </span>{app.author}</p>
          <p><span className="def">模板: </span>{app.template && app.template.name || '默认模板'}</p>
          <p><span className="def preview">预览机preview: </span>
            <span className="prerelation def">host: <span className="val">{app.preview.host}</span></span>
            <span className="prerelation def">port: <span className="val">{app.preview.port}</span></span>
            <span className="prerelation def">user: <span className="val">{app.preview.user}</span></span>
            <span className="prerelation def">pass: <span className="val">{app.preview.pass}</span></span>
            <span className="prerelation def">fdPath: <span className="val">{app.preview.fdPath}</span></span>
            <span className="prerelation def">domain: <span className="val">{app.preview.domain}</span></span>
            <span className="prerelation def">remotePath: <span className="val">{app.preview.remotePath}</span></span>
          </p>
          {this.showDeploys(app.deploys)}
          <p><span className="def">创建时间: </span>{Moment(app.createTime).fromNow()}</p>
        </div>
      </li>
    );
  }
}
