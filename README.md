# semantic-ui-react-numberinput
Numeric input control with step buttons for Semantic UI React

![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/number_input.png)

![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/right_buttons_number_input.png)

## Prerequisites
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "semantic-ui-react": "^0.87.0"

## Installation
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
    
   Specify allowed number range to be between 0 and 100
         
         <NumberInput minValue={0} maxValue={100} value={this.state.value} onChange={this.changeValue} />
         
   Specify buttons to increment/decrement by 5 
                  
         <NumberInput stepAmount={5} value={this.state.value} onChange={this.changeValue} />
         
   Specify decimal NumberInput with increment/decrement step of 0.25 and default precision of 2 
                   
         <NumberInput valueType="decimal" stepAmount={0.25} value={this.state.value} onChange={this.changeValue} />
          
   Specify decimal NumberInput with increment/decrement step of 0.1 and precision of 1 
                     
         <NumberInput valueType="decimal" stepAmount={0.1} precision={1} value={this.state.value} onChange={this.changeValue} />

## Mandatory NumberInput properties      
         value: string, // must be parseable to integer or decimal number depending on valueType
         onChange: (newValue: string) => void,
         
## Optional NumberInput properties
         buttonPlacement?: 'right' | 'leftAndRight'
         id?: string,
         className?: string,
         minValue?: number,     // must be integer or decimal number depending on valueType
         maxValue?: number,     // must be integer or decimal number depending on valueType
         maxLength?: number,    // must be positive integer
         precision?: number,    // must be positive integer, applicable to valueType 'decimal' only
         size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
         stepAmount?: number,   // must be positive integer or decimal number
         valueType?: 'integer' | 'decimal'
         
## Default values for optional properties
        buttonPlacement: 'leftAndRight',
        id: null,
        className: null,
        minValue: -999999999,
        maxValue: 9999999999,
        maxLength: 10,
        precision: 2,
        size: 'small',
        stepAmount: 1,
        valueType: 'integer'
        
## Styling example
![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/styled_number_input.png)

   styles.css
   
    .numberInput .ui.button {
      background-color: red;
      color: white;
    }
    
    .numberInput .ui.input > input {
      border-color: red;
      color: red;
      font-weight: bold;
      width: 50px;
    }
    
   Applying CSS using className
   
    <NumberInput className="numberInput" value={this.state.value} onChange={this.changeValue} />
    
## License
MIT License

