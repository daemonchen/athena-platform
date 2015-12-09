import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Breadcrumbs from '../components/templates/Breadcrumbs';
import auth from '../utils/auth';
import {requestTemplates} from '../actions/template';
import TemplateItem from '../components/templates/TemplateItem';

class Template extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {children, dispatch} = this.props;
    if (!children) {
      dispatch(requestTemplates());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {children, dispatch} = this.props;
    if (children && !nextProps.children) {
      dispatch(requestTemplates());
    }
  }

  render() {
    const {params, templates, template} = this.props;
    return (
      <div>
        {params.templateId && <Breadcrumbs templateId={template._id} templateName={template.name}/>}
        {this.props.children ||
          <div>
            <div className="template-list">
              <h4>Template Lists</h4>
              <ul className="collapsible" data-collapsible="expandable">
                {templates.map(template => {
                  return <TemplateItem key={template._id} template={template} />
                })}
              </ul>
            </div>
            {auth.loggedIn() &&
              <Link to={`/template`} className="waves-effect waves-light btn"><i className="material-icons left">add_circle_outline</i>New Template</Link>
            }
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {template} = state;
  return {
    templates: template.templates,
    template: template.template
  };
}

export  default connect(mapStateToProps)(Template);
