import React, {Component, PropTypes} from 'react';
import Header from '../components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const {history} = this.props;

    history.replaceState(null, '/');
  }

  render() {
    const {location} = this.props;
    const {pathname} = location;
    let root = pathname === '/' || pathname.indexOf('/records') === 0;

    return (
      <div>
        <Header root={root} logout={this.logout}/>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.node,
  logout: PropTypes.Func
};

export default App;
