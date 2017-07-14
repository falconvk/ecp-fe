import React, { Component, PropTypes } from 'react';

const base_color_hex = '#000000';

class CustomComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      color: base_color_hex,
      isBaseColorApplied: true,
    };

    this.getNewColor = this.getNewColor.bind(this);
    this.onTextClick = this.onTextClick.bind(this);
  }

  componentWillMount() {
    this.getNewColor();
  }

  getNewColor() {
    fetch('http://www.colr.org/json/color/random')
      .then(response => response.json())
      .then(data => this.setState({ color: `#${data.colors[0].hex}`, isBaseColorApplied: false }));
  }

  onTextClick() {
    if (this.state.isBaseColorApplied) this.getNewColor();
    else this.setState({ color: base_color_hex, isBaseColorApplied: true });
  }

  render() {
    console.log(this.state);

    const style = {
      color: this.state.color,
      cursor: 'pointer',
    };

    return (
      <h2 style={style} onClick={this.onTextClick}>
        {this.props.children}
      </h2>
    );
  }
}

CustomComp.propTypes = {
  children: PropTypes.node,
};

export default CustomComp;
