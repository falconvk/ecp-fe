import React, { Component } from 'react';
import { InputGroup, FormControl, Col, Row} from 'react-bootstrap';
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
        </div>
        <div className="container">
          <CustomComp>
            {mainText}
          </CustomComp>
          <InputGroup className="center-block">
            <FormControl
              className="text-center well"
              placeholder="Got a better title?"
              type="text"
              value={this.state.text}
              onChange={this.updateText} />
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default App;
