import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {requestRegister} from '../actions/user';
import {resetError} from '../actions/resetError';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {eye: false};
    this.changeEye = this.changeEye.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(resetError());
  }

  changeEye(e) {
    e.preventDefault();

    this.setState({eye: !this.state.eye});
  }

  handleSubmit(e) {
    const {dispatch} = this.props;
    e.preventDefault();
    dispatch(requestRegister(this.refs.username.value, this.refs.email.value, this.refs.pass.value, '/'));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.errorMessage !== nextProps.errorMessage || nextState.eye !== this.state.eye;
  }

  render() {
    return (
      <div className="row register">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <h4>账号注册</h4>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">mail outline</i>
              <input id="email" type="email" className="validate" ref="email" required />
              <label htmlFor="email">邮箱</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input id="username" type="text" className="validate" ref="username" required />
              <label htmlFor="username">用户名</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock outline</i>
              <input id="password" type={this.state.eye ? 'text' : 'password'} ref="pass" className="validate" required/>
              <label htmlFor="password">密码</label>
              <i className={'material-icons prefix icon-eye' + (this.state.eye ? ' active-eye' : '')} onClick={this.changeEye}>remove_red_eye</i>
            </div>
          </div>
          <div className="row">
            <div className="error">{this.props.errorMessage}</div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light" type="submit">注册
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {errorMessage} = state;

  return {
    errorMessage
  };
}

export default connect(mapStateToProps)(Register);

