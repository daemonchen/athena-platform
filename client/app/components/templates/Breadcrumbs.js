import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Breadcrumbs extends Component {
  render() {
    const {templateId, templateName} = this.props;

    return(
      <div className="breadcrumbs">
        <div className="col s12">
          <Link to={`/templates`} className="breadcrumb">Templates</Link>
          <Link to={`/template/${templateId}`} className="breadcrumb">{templateName}</Link>
        </div>
      </div>
    );
  }
}
