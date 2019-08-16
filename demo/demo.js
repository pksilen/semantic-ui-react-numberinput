import React from 'react';
import { render } from 'react-dom';

import NumberInput from '../src/NumberInput';

class DemoApp extends React.Component {
  state = {
    firstNumberInputValue: '0',
    secondNumberInputValue: '0'
  };

  changeFirstNumberInputValue = (newValue) => {
    this.setState((prevState) => ({ ...prevState, firstNumberInputvalue: newValue }));
  };

  changeSecondNumberInputValue = (newValue) => {
    this.setState((prevState) => ({ ...prevState, secondNumberInputvalue: newValue }));
  };

  render() {
    const { firstNumberInputValue, secondNumberInputValue } = this.state;

    return (
      <div>
        <h1>NumberInput Demo</h1>
        <p>Default NumberPicker (buttonPlacement=&quot;leftAndRight&quot;)</p>
        <NumberInput value={firstNumberInputValue} onChange={this.changeFirstNumberInputValue} />
        <br />
        <p>NumberPicker (buttonPlacement=&quot;right&quot;) </p>
        <NumberInput
          buttonPlacement="right"
          value={secondNumberInputValue}
          onChange={this.changeSecondNumberInputValue}
        />
        <p>
          <br />
        </p>
        <a href="https://github.com/pksilen/semantic-ui-react-numberinput">
          semantic-ui-react-numberinput on GitHub
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');
render(<DemoApp />, rootElement);
