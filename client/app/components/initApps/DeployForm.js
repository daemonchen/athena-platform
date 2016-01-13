import React, {Component} from 'react';

export default class DeployForm extends Component {
  constructor(props) {
    super(props);
    this.demo = this.demo.bind(this);
  }

  demo() {
    console.log('father click');
  }

  render() {
    return (
    <div>
      <div className="row">
        <div className="input-field col s8">
         <input type="text" required className="validate"/>
         <label>机器名称</label>
        </div>
        <div className="input-field col s8">

        </div>
        <div className="input-field col s6">
          <input type="text" required className="validate"/>
          <label>Host</label>
        </div>
        <div className="input-field col s6">
          <input type="text" required className="validate" />
          <label>Port</label>
        </div>
      </div>
    </div>
    );
  }
}
