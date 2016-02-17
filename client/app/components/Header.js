import React, {Component} from 'react';
import {Link} from 'react-router';
import auth from '../utils/auth';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.logout();
    this.props.logout();
  }

  render() {
    return (
      <div className="navbar-fixed header">
        <nav className="nav">
          <div className="nav-wrapper">
            <a href="#" className="left brand-logo waves-effect waves-light"><i className="material-icons">brightness_auto</i><span>thena</span></a>
            <ul className="left">
              <li><Link to={`/records`} className={'waves-effect waves-light' + (this.props.root ? ' active' : '')} activeClassName="active">记录</Link></li>
              <li><Link to={`/projects`} className="waves-effect waves-light" activeClassName="active">项目</Link></li>
              <li><Link to={`/templates`} className="waves-effect waves-light" activeClassName="active">模板</Link></li>
              <li><Link to={`/analysis`} className="waves-effect waves-light" activeClassName="active">统计</Link></li>
            </ul>
            <ul className={'right' + (auth.loggedIn() ? '' : ' hide')}>
              <li>
                <a href="javascript:void(0);" data-activates="menu" className="dropdown-button waves-effect waves-light" activeClassName="active">{auth.getUser()}</a>
                <ul id="menu" className="dropdown-content">
                  <li><Link to={`/initapps`}>远程项目</Link></li>
                  <li><a href="javascript:void(0)" onClick={this.logout}>登出</a></li>
                </ul>
              </li>
            </ul>
            <ul className={'right' + (auth.loggedIn() ? ' hide' : '')}>
              <li><Link to={`/login`} className="waves-effect waves-light" activeClassName="active">登录</Link></li>
              <li><Link to={`/register`} className="waves-effect waves-light" activeClassName="active">注册</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
