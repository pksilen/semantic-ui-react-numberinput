import React from 'react';
import { render } from 'react-dom';

import NumberInput from '../src/NumberInput';

class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0'
    };
  }

  changeValue = newValue => {
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <h1>NumberInput Demo</h1>
        <p>Default NumberPicker </p>
        <NumberInput value={value} onChange={this.changeValue} />
        <p></p>
        <a href="https://github.com/pksilen/semantic-ui-react-numberinput">
          semantic-ui-react-numberinput on GitHub
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');
render(<DemoApp />, rootElement);
