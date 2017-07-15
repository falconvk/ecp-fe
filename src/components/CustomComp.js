import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Alert } from 'react-bootstrap';

const base_color_hex = '#000000';

// TODO: all a loading indicator
class CustomComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      timesChanged: 0,
      color: base_color_hex,
      isBaseColorApplied: true,
      errorMessage: '',
      showError: false,
    };

    this.getNewColor = this.getNewColor.bind(this);
    this.onTextClick = this.onTextClick.bind(this);
    this.showError = this.showError.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentWillMount() {
    this.onTextClick();
  }

  getNewColor() {
    fetch('http://www.colr.org/json/color/random')
      .then(response => response.json())
      .then(data => {
        if (!data.new_color) {
          this.showError('Empty response color received!');
          return;
        }
        const newState = Object.assign({}, this.state);
        newState.color = `#${data.new_color}`;
        newState.isBaseColorApplied = false;
        newState.timesChanged += 1;
        this.setState(newState);
      });
  }

  resetColor() {
    const newState = Object.assign({}, this.state);
    newState.color = base_color_hex;
    newState.isBaseColorApplied = true;
    newState.timesChanged += 1;
    this.setState(newState);
  }

  onTextClick() {
    this.clearError();
    if (this.state.isBaseColorApplied) this.getNewColor();
    else this.resetColor();
  }

  showError(message) {
    this.setState({ errorMessage: message, showError: true });
    setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  clearError() {
    this.setState({ errorMessage: '', showError: false });
  }

  render() {
    const style = {
      color: this.state.color,
      cursor: 'pointer',
    };

    return (
      <InputGroup style={{ width: '100%' }} onClick={this.onTextClick}>
        <InputGroup.Addon style={{ width: '15%', background: this.state.color }}>
          {this.state.color}
        </InputGroup.Addon>
        <h2 style={style}>
          {this.props.children}
        </h2>
        <InputGroup.Addon style={{ width: '15%', background: this.state.color }}>
          {this.state.timesChanged}
        </InputGroup.Addon>

        {this.state.showError
          ? <Alert bsStyle="danger"
                   onDismiss={this.clearError}
                   style={{ zIndex: '5000', position: 'absolute', right: '0', top: '110px' }}>
           <h4>{this.state.errorMessage}</h4>
         </Alert>
          : null}

      </InputGroup>
    );
  }
}

CustomComp.propTypes = {
  children: PropTypes.node,
};

export default CustomComp;
