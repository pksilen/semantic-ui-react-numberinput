// @flow

import React from 'react';
import type { Element } from 'react';
import { render } from 'react-dom';
// $FlowFixMe
import NumberInput from '../src/NumberInput';

type State = {
  numberInputValues: string[]
};

class DemoApp extends React.Component<{}, State> {
  state = {
    numberInputValues: ['0', '0', '0', '0', '', '10', '0', '0', '0', '0', '0', '0']
  };

  changeNumberInputValue = (newValue: string, numberInputComponentIndex: number) => {
    this.setState((prevState: State): State => {
      const { numberInputValues } = prevState;
      numberInputValues[numberInputComponentIndex] = newValue;

      return {
        numberInputValues
      };
    });
  };

  render(): Element<*> {
    const { numberInputValues } = this.state;

    // noinspection MagicNumberJS
    return (
      <div style={{ marginLeft: '5px' }}>
        <h1>NumberInput Demo</h1>
        Default NumberPicker (buttonPlacement=&quot;leftAndRight&quot;)
        <NumberInput
          value={numberInputValues[0]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 0)}
        />
        <br />
        NumberPicker (buttonPlacement=&quot;right&quot;)
        <NumberInput
          buttonPlacement="right"
          value={numberInputValues[1]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 1)}
        />
        <br />
        NumberPicker
        (buttonPlacement=&quot;right&quot;,&nbsp;minValue=-100,&nbsp;maxValue=100,&nbsp;stepAmount=5)
        <NumberInput
          buttonPlacement="right"
          minValue={-100}
          maxValue={100}
          stepAmount={5}
          value={numberInputValues[2]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 2)}
        />
        <br />
        NumberPicker
        (buttonPlacement=&quot;right&quot;,&nbsp;valueType=&quot;decimal&quot;,&nbsp;stepAmount=0.25)
        <NumberInput
          buttonPlacement="right"
          valueType="decimal"
          stepAmount={0.25}
          value={numberInputValues[3]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 3)}
        />
        <br />
        NumberPicker
        (buttonPlacement=&quot;right&quot;,&nbsp;allowEmptyValue=true,&nbsp;showError=true,&nbsp;value=&quot;&quot;)
        <NumberInput
          buttonPlacement="right"
          allowEmptyValue
          showError
          value={numberInputValues[4]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 4)}
        />
        <br />
        NumberPicker
        (buttonPlacement=&quot;right&quot;,&nbsp;allowEmptyValue=true,&nbsp;defaultValue=10,&nbsp;
        placeholder=&quot;Enter a number&quot;)
        <NumberInput
          buttonPlacement="right"
          allowEmptyValue
          defaultValue={10}
          placeholder="Enter a number"
          value={numberInputValues[5]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 5)}
        />
        <h2>NumberInput sizes</h2>
        Mini
        <NumberInput
          size="mini"
          value={numberInputValues[6]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 6)}
        />
        <br />
        Small
        <NumberInput
          size="small"
          value={numberInputValues[7]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 7)}
        />
        <br />
        Large
        <NumberInput
          size="large"
          value={numberInputValues[8]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 8)}
        />
        <br />
        Big
        <NumberInput
          size="big"
          value={numberInputValues[9]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 9)}
        />
        <br />
        Huge
        <NumberInput
          size="huge"
          value={numberInputValues[10]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 10)}
        />
        <br />
        Massive
        <NumberInput
          size="massive"
          value={numberInputValues[11]}
          onChange={(newValue: string) => this.changeNumberInputValue(newValue, 11)}
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
