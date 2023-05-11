import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
// import ColorPicker from '../components/ColorPicker';

const ColorPicker = ({ index, color, onColorChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    onColorChange(index, newColor);
  };

  return (
    <div className="relative">
      <div
        className="flex-grow h-16 bg-gray-300 cursor-pointer hover:bg-gray-400"
        style={{ backgroundColor: color }}
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
      >
        Yo
        {showPicker && (
          <div className="absolute left-0 z-10 top-full">
            <HexColorPicker color={color} onChange={handleColorChange} />
          </div>
        )}
      </div>
    </div>
  );
};


export default function Home() {
  const [images, setImages] = useState(null);
  const [colors, setColors] = useState(Array(5).fill(null).map(generateHexCode));

  const handleColorChange = (index, newColor) => {
    setColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = newColor;
      return newColors;
    });
  };

  function generateHexCode() {
    const hexChars = '0123456789ABCDEF';
    let hex = '';
  
    // Generate a random 6-digit hex code
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * 16)];
    }
    
    // console.log(hex)
    hex = "#" + hex.toLowerCase()
    return hex;
  }
  

  const generateRandomPalette = () => {
    const numColors = Math.floor(Math.random() * 4) + 2;
    const newColors = Array(5).fill(null);
  
    for (let i = 0; i < numColors; i++) {
      newColors[i] = generateHexCode();
    }
  
    setColors(newColors);

    fetchPalette();
  };

  async function fetchPalette() {
    // const res = await fetch("/api/palette?hex=374121-5d4538-477e92-c0b69e-163a60");
    let url = `/api/palette?hex=${colors[1]}-${colors[2]}-${colors[3]}-${colors[4]}-${colors[5]}`
        url = url.replaceAll('#', '')
        
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    setImages(data);
  }

  useEffect(() => {
    fetchPalette();
  }, []);

  

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        {/* <button onClick={fetchPalette}>fetch</button> */}
        {/* <div style={{display: "flex"}}>
          <div style={{backgroundColor: color1, padding: "10px"}}>color1</div>
          <div style={{backgroundColor: color2, padding: "10px"}}>color2</div>
          <div style={{backgroundColor: color3, padding: "10px"}}>color3</div>
          <div style={{backgroundColor: color4, padding: "10px"}}>color4</div>
          <div style={{backgroundColor: color5, padding: "10px"}}>color5</div>
        </div> */}

        <button onClick={generateRandomPalette}>random palette</button>
        <button onClick={fetchPalette}>fetch new images</button>
      
        {/* <div style={{display: "flex", width: '100vw', justifyContent: 'space-between'}}>
          <HexColorPicker style={{width: '120px'}} color={color1} onChange={setColor1} />
          <ColorPicker color={color1} onChange={setColor1} />
          <HexColorPicker style={{width: '120px'}} color={color2} onChange={setColor2} />
          <HexColorPicker style={{width: '120px'}} color={color3} onChange={setColor3} />
          <HexColorPicker style={{width: '120px'}} color={color4} onChange={setColor4} />
          <HexColorPicker style={{width: '120px'}} color={color5} onChange={setColor5} />
        </div> */}

        <div style={{display: "flex", width: '100vw', height:'100%', justifyContent: 'space-between'}}>
        {colors.map((color, index) => (
          <ColorPicker key={index} index={index} color={color} onColorChange={handleColorChange} />
        ))}

        </div>
      
      </main>
    </>
  )
}
