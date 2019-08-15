# semantic-ui-react-numberinput
Numeric input control with step buttons for Semantic UI React

![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/number_input.png)

## Prerequisites
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "semantic-ui-react": "^0.87.0"

## Install
    npm install --save semantic-ui-react-numberinput
    
## Example usage
    import React from 'react';
    import NumberInput from 'semantic-ui-react-numberinput';
    
    class NumberInputExample extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                value: '0'
            };
        }
        
        changeValue = (newValue) => {
            this.setState({ value: newValue });
        }
       
        render() => {(
            <NumberInput value={this.state.value} onChange={this.changeValue} />
        )};
    }

## NumberInput properties      
         value: string, // must be parseable to integer
         onChange: (newValue: string) => void,
         className?: string,
         minValue?: number, // must be integer
         maxValue?: number, // must be integer
         maxLength?: number, // must be positive integer
         size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
         stepCount?: number, //must be positive integer
         
## Default values for props
        className: '',
        minValue: Number.MIN_SAFE_INTEGER,
        maxValue: Number.MAX_SAFE_INTEGER,
        maxLength: 10,
        size: 'small',
        stepCount: 1
        
## Styling example
   styles.css
   
    .numberInput .ui.button {
      background-color: red;
      color: white;
    }
    
    .numberInput .ui.input input {
      border-color: red;
      color: red;
      font-weight: bold;
      width: 50px;
    }
    
   Applying CSS
   
    <NumberInput className="numberInput" value={this.state.value} onChange={this.changeValue} />
    
    
    
        
## License
MIT License

