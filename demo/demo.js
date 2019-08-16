// @flow

import React from 'react';
import type { Element } from 'react';
import { render } from 'react-dom';
// $FlowFixMe
import NumberInput from '../src/NumberInput';

type State = {
  firstNumberInputValue: string,
  secondNumberInputValue: string,
  thirdNumberInputValue: string,
  fourthNumberInputValue: string
};

class DemoApp extends React.Component<{}, State> {
  state = {
    firstNumberInputValue: '0',
    secondNumberInputValue: '0',
    thirdNumberInputValue: '0',
    fourthNumberInputValue: '0'
  };

  changeFirstNumberInputValue = (newValue: string) => {
    this.setState((prevState: State) => ({ ...prevState, firstNumberInputValue: newValue }));
  };

  changeSecondNumberInputValue = (newValue: string) => {
    this.setState((prevState: State) => ({ ...prevState, secondNumberInputValue: newValue }));
  };

  changeThirdNumberInputValue = (newValue: string) => {
    this.setState((prevState: State) => ({ ...prevState, thirdNumberInputValue: newValue }));
  };

  changeFourthNumberInputValue = (newValue: string) => {
    this.setState((prevState: State) => ({ ...prevState, fourthNumberInputValue: newValue }));
  };

  render(): Element<*> {
    const {
      firstNumberInputValue,
      secondNumberInputValue,
      thirdNumberInputValue,
      fourthNumberInputValue
    } = this.state;

    return (
      <div style={{ marginLeft: '5px' }}>
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
        <br />
        <p>NumberPicker (buttonPlacement=&quot;right&quot;, minValue=0, maxValue=100, stepAmount=5)</p>
        <NumberInput
          buttonPlacement="right"
          minValue={0}
          maxValue={100}
          stepAmount={5}
          value={thirdNumberInputValue}
          onChange={this.changeThirdNumberInputValue}
        />
        <br />
        <p>
          NumberPicker (buttonPlacement=&quot;right&quot;, valueType=&quot;decimal&quot;, stepAmount=0.25)
        </p>
        <NumberInput
          buttonPlacement="right"
          valueType="decimal"
          stepAmount={0.25}
          value={fourthNumberInputValue}
          onChange={this.changeFourthNumberInputValue}
        />
        <p>
          <br />
        </p>
        <a href="https://github.com/pksilen/semantic-ui-react-numberinput">
          View semantic-ui-react-numberinput on GitHub
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');

if (rootElement) {
  render(<DemoApp />, rootElement);
}
