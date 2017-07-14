import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CustomComp from './components/CustomComp';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { text: '' };

    this.updateText = this.updateText.bind(this);
  }

  updateText(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const mainText = this.state.text ? this.state.text : 'Welcome to React';

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <CustomComp>
            {mainText}
          </CustomComp>
        </div>
        <input
          type="text"
          value={this.state.text}
          onChange={this.updateText} />
      </div>
    );
  }
}

export default App;
