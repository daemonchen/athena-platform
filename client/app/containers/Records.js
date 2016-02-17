import React, {Component} from 'react';
import {connect} from 'react-redux';
import RecordNav from '../components/records/RecordNav';
import RecordItems from '../components/records/RecordItems';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import {requestRecords} from '../actions/records';
import {requestProjects} from '../actions/projects';

class Records extends Component {
  componentDidMount() {
    const {dispatch, location, params} = this.props;
    const {type} = params;
    const {page, appid} = location.query;
    dispatch(requestRecords(type, page, appid));
    dispatch(requestProjects());
  }

  componentWillReceiveProps(nextProps) {
    const {query} = this.props.location;
    const {params, location} = nextProps;
    const {type} = nextProps.params;
    const {page, appid, author} = location.query;

    if (type !== this.props.params.type || page !== query.page || appid !== query.appid || author !== query.author) {
      const {dispatch} = this.props;
      dispatch(requestRecords(type, page, appid, author));
    }
  }

  render() {
    const {params, location} = this.props;
    let root = params.type === undefined;
    let url = '/records/' + (params.type ? params.type : 'all') + (location.query.appid ? '?appid=' + location.query.appid : '');
    let userUrl = url;
    if (location.query.author && location.query.author !== '') {
      if (url.indexOf('?') === -1) {
        url += '?author=' + location.query.author;
      } else {
        url += '&author=' + location.query.author;
      }
    }
    return (
      <div className="row">
        <div className="col s9">
          <RecordNav appid={location.query.appid} author={location.query.author} root={root}/>
          <RecordItems records={this.props.records} url={userUrl}/>
          {this.props.records && this.props.records.length > 0 &&
            <Pagination url={url} pagination={this.props.pagination}/>
          }
        </div>
        <div className="col s3">
          <Sidebar url={'/records/' + (params.type ? params.type : 'all')} appid={location.query.appid} projects={this.props.projects}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {records, projects} = state;
  return {
    records: records.records,
    pagination: records.pagination,
    projects: projects.projects
  };
}

export default connect(mapStateToProps)(Records);
