import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {requestLogin} from '../actions/user';
import {resetError} from '../actions/resetError';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(resetError());
  }

  handleSubmit(e) {
    e.preventDefault();
    const {dispatch, location} = this.props;
    let redirect = location.state && location.state.nextPathname ? location.state.nextPathname : '/';
    dispatch(requestLogin(this.refs.email.value, this.refs.pass.value, redirect));
  }

  render() {
    return (
      <div className="row login">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <h4>Login to Your Account</h4>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">mail outline</i>
              <input id="email" type="email" ref="email" className="validate" required/>
              <label htmlFor="email">Your Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">lock outline</i>
              <input id="password" type="password" ref="pass" className="validate" required/>
              <label htmlFor="password">Your Password</label>
            </div>
          </div>
          <div className="row">
            <div className="error">{this.props.errorMessage}</div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light" type="submit">Login
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

export default connect(mapStateToProps)(Login);

