import React, {Component} from 'react';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let search = this.refs.search.value;
    search = search && search.trim();

    search !== '' && this.props.search(search);
  }

  render() {
    return (
      <div className="search">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="可搜索image、js、css、页面、页面片" ref="search" type="text" className="validate" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
