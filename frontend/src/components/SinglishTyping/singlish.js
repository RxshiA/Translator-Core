import React, { useState, useEffect } from 'react';

function Translation() {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  useEffect(() => {
    // This effect will run when the component mounts
    trans(inputValue);
  }, [inputValue]);

  const trans = async (txtAre) => {
    const remotePath = "https://easysinhalaunicode.com/Api/convert";
    try {
      const response = await fetch(remotePath, {
        method: "POST",
        body: JSON.stringify({ data: txtAre }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setResultValue(data);
    } catch (err) {
      setResultValue(err.message);
    }
  };

  return (
    <div>
      <textarea
        id="sou"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></textarea>
      <div>
        <button onClick={() => trans(inputValue)}>Submit</button>
      </div>
      <textarea id="res" value={resultValue} readOnly></textarea>
    </div>
  );
}

export default Translation;