import React, { useEffect, useState } from "react";
import './ConverterComponent.css';
function ConverterComponent() {
  const [currency, setCurrency] = useState([]);
  const [input, setInput] = useState({
    currencyValueToBeConverted: '',
    convertedCurrencyValue: '',
    concurrencyUnitToBeConverted: 'USD',
    convertedCurrencyUnit: 'INR'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:3200/api/v1/currency');
    const data = await response.json();
    setCurrency(data.map(iterator => iterator.code));
  };

  const handleConvert = async () => {
    const response = await fetch(`http://localhost:3200/api/v1/convert/${input.concurrencyUnitToBeConverted}/${input.convertedCurrencyUnit}`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        currencyValueToBeConverted: input.currencyValueToBeConverted
      })
    });
    const data = await response.json();
    setInput(prevInput => ({ ...prevInput, convertedCurrencyValue: data.result.toFixed(2) }));
  };

  const handleInputChange = (event) => {
    setInput(prevInput => ({ ...prevInput, currencyValueToBeConverted: event.target.value }));
  };

  const handleCurrencyChange = (event) => {
    setInput(prevInput => ({ ...prevInput, [event.target.name]: event.target.value }));
  };
  
  return (
    <React.Fragment>

      <div className="header">Currency Converter</div>
     
      <div className='master'>
        <div className='user-input'>
          <div className='title'>
            From:
            <select
              className='select'
              name="concurrencyUnitToBeConverted"
              value={input.concurrencyUnitToBeConverted}
              onChange={handleCurrencyChange}>

              {currency.map((item, itemIndex) => (
                <option key={itemIndex}>{item}</option>
              ))}
            </select>
          </div>
          <input
            className='input'
            value={input.currencyValueToBeConverted}
            onChange={handleInputChange}
            type='number'
          />
        </div>
        <div className='user-input'>
          <div className='title'>
            To:
            <select
              className='select'
              name="convertedCurrencyUnit"
              value={input.convertedCurrencyUnit}
              onChange={handleCurrencyChange}>

              {currency.map((item, itemIndex) => (
                <option key={itemIndex}>{item}</option>
              ))}
            </select>
          </div>
          <input
            className='input'
            value={input.convertedCurrencyValue}
            disabled
            type='text'
          />
        </div>
      </div>
      <div className='button-container'>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <div className="instruction">
        <ol>
            <li>Select the currency to be converted</li>
            <li>Select the currency to be converted into</li>
            <li>Enter the value of currency to be converted</li>
            <li>Press enter</li>
        </ol>
        
      </div>
      
    </React.Fragment>
  );
}

export default ConverterComponent;
