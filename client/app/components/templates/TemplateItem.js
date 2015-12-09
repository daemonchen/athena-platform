import React, {Component} from 'react';
import {Link} from 'react-router';

export default class TemplateItem extends Component {
  render() {
    const {template} = this.props;

    return (
      <li>
        <div className="collapsible-header">
          <i className="material-icons">web_assert</i>
          <Link to={`/template/${template._id}`}>{template.name}</Link>
        </div>
      </li>
    );
  }
}
