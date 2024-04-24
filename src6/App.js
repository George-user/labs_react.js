import React, { useState, useEffect } from 'react';

  let ColorPicker = () => {
  let [selectedColor, setSelectedColor] = useState('#ffffff');
  let [savedColors, setSavedColors] = useState([]);

  useEffect(() => {
    let savedColorsFromStorage = JSON.parse(localStorage.getItem('savedColors'));
    if (savedColorsFromStorage) {
      setSavedColors(savedColorsFromStorage);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('savedColors', JSON.stringify(savedColors));
  }, [savedColors]);



  let dleColorSe = (color) => {
    setSelectedColor(color);
  };

  let Resetcolor = () => {
    setSelectedColor('#ffffff');
  };

  let Savecolor = () => {
    setSavedColors([...savedColors, selectedColor]);
  };

  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2>Color Picker</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Selected Color:</h3>
        <div style={{ width: '100px', height: '100px', backgroundColor: selectedColor, borderRadius: '50%', border: '2px solid #333', marginBottom: '10px' }}></div>
        <button style={{ padding: '5px 10px', marginRight: '10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={Resetcolor}>Reset</button>
        <button style={{ padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={Savecolor}>Save</button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Palette:</h3>
        <div>
          <button style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#ff0000', border: 'none', cursor: 'pointer' }} onClick={() => dleColorSe('#ff0000')}></button>
          <button style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#00ff00', border: 'none', cursor: 'pointer' }} onClick={() => dleColorSe('#00ff00')}></button>
          <button style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#0000ff', border: 'none', cursor: 'pointer' }} onClick={() => dleColorSe('#0000ff')}></button>
          <button style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#ffff00', border: 'none', cursor: 'pointer' }} onClick={() => dleColorSe('#ffff00')}></button>
          <button style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#ff00ff', border: 'none', cursor: 'pointer' }} onClick={() => dleColorSe('#ff00ff')}></button>
          {}
        </div>
      </div>
      <div>
        <h3>Saved Colors:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {savedColors.map((color, index) => (
            <li key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: color, borderRadius: '50%', border: '1px solid #333' }}></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ColorPicker;
