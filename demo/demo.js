import React from 'react';
import { render } from 'react-dom';

import NumberInput from '../src/NumberInput';

class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNumberInputValue: '0',
      secondNumberInputValue: '0'
    };
  }

  changeFirstNumberInputValue = newValue => {
    this.setState({ firstNumberInputvalue: newValue });
  };

  changeSecondNumberInputValue = newValue => {
    this.setState({ secondNumberInputvalue: newValue });
  };

  render() {
    const { firstNumberInputValue, secondNumberInputValue } = this.state;

    return (
      <div>
        <h1>NumberInput Demo</h1>
        <p>Default NumberPicker (buttonPlacement="leftAndRight") </p>
        <NumberInput value={firstNumberInputValue} onChange={this.changeFirstNumberInputValue} />
        <br />
        <p>NumberPicker (buttonPlacement="right") </p>
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
