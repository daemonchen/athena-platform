import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Pagination extends Component {
  render() {
    const {pagination, url} = this.props;
    let pages = [];

    if (pagination.count < 6) {
      for (let i = 1; i < pagination.count + 1; i++) {
        pages.push(i);
      }
    } else {
      pages.push(pagination.current);
      if (pagination.current - 2 > 0 && pagination.current + 2 <= pagination.count) {
        pages.unshift(pagination.current - 1);
        pages.unshift(pagination.current - 2);
        pages.push(pagination.current + 1);
        pages.push(pagination.current + 2);
      } else {
        if (pagination.current - 2 <= 0) {
          pages = [1, 2, 3, 4, 5];
        } else {
          pages = [pagination.count - 4, pagination.count - 3, pagination.count - 2, pagination.count -1, pagination.count];
        }
      }
    }

    return (
      <ul className="pagination">
        {pagination.current === 1 &&
          <li className="disabled">
            <a href="javascript:void(0);"><i className="material-icons">chevron_left</i></a>
          </li>
          ||
          <li className="waves-effect waves-red">
            <Link to={url} query={{page: pagination.current - 1}}><i className="material-icons">chevron_left</i></Link>
          </li>
        }
        {pages.map(page => {
          return (
            <li key={'page' + Math.random()} className={'waves-effect waves-red' + (pagination.current === page ? ' active' : '')}>
              <Link to={url} query={{page: page}}>{page}</Link>
            </li>
          );
        })}
        {pagination.current === pagination.count &&
          <li className="disabled">
            <a href="javascript:void(0);"><i className="material-icons">chevron_right</i></a>
          </li>
          ||
          <li className="waves-effect waves-red">
            <Link to={url} query={{page: pagination.current + 1}}><i className="material-icons">chevron_right</i></Link>
          </li>
        }
      </ul>
    );
  }
}
