import React, {Component} from 'react';
import RecordItem from './RecordItem';

export default class RecordItems extends Component {
  render() {
    const {records} = this.props;
    return (
      <div>
        {records && records.length > 0 && records.map(record => {
          return (
            <RecordItem record={record} url={this.props.url} key={record._id} />
          );
        })}
        {records && records.length === 0 &&
          <div>暂无数据</div>
        }
      </div>
    );
  }
}
