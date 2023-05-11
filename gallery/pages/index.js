import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
// import fetchPalette from './api/palette'
import React, { useState, useEffect } from "react";


export default function Home() {
  const [images, setImages] = useState(null);
  const [color1, setColor1] = useState(generateHexCode());
  const [color2, setColor2] = useState(generateHexCode());
  const [color3, setColor3] = useState(generateHexCode());
  const [color4, setColor4] = useState(generateHexCode());
  const [color5, setColor5] = useState(generateHexCode());

  function generateHexCode() {
    const hexChars = '0123456789ABCDEF';
    let hex = '';
  
    // Generate a random 6-digit hex code
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * 16)];
    }
  
    return hex.toLowerCase();
  }
  
  async function generateRandomPalette() {
    // setColor1(generateHexCode());
    // setColor2(generateHexCode());
    // setColor3(generateHexCode());
    // setColor4(generateHexCode());
    // setColor5(generateHexCode());

    // rand number between 2 and 5
    let numColors = Math.floor(Math.random() * 4) + 2;

    // I hate this code
    if (numColors == 5) {
      setColor1(generateHexCode())
      setColor2(generateHexCode());
      setColor3(generateHexCode());
      setColor4(generateHexCode());
      setColor5(generateHexCode());
    } else if (numColors == 4) {
      setColor1(generateHexCode())
      setColor2(generateHexCode());
      setColor3(generateHexCode());
      setColor4(generateHexCode());
      setColor5(null);
    } else if (numColors == 3) {
      setColor1(generateHexCode())
      setColor2(generateHexCode());
      setColor3(generateHexCode());
      setColor4(null);
      setColor5(null);
    } else if (numColors == 2) {
      setColor1(generateHexCode())
      setColor2(generateHexCode());
      setColor3(null);
      setColor4(null);
      setColor5(null);
    }
    
    fetchPalette();

    console.log(`${color1}-${color2}-${color3}-${color4}-${color5}`)
  }

  async function fetchPalette() {
    // const res = await fetch("/api/palette?hex=374121-5d4538-477e92-c0b69e-163a60");
    const res = await fetch(`/api/palette?hex=${color1}-${color2}-${color3}-${color4}-${color5}`);
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
        <div style={{display: "flex"}}>
          <div style={{backgroundColor: "#"+color1, padding: "10px"}}>color1</div>
          <div style={{backgroundColor: "#"+color2, padding: "10px"}}>color2</div>
          <div style={{backgroundColor: "#"+color3, padding: "10px"}}>color3</div>
          <div style={{backgroundColor: "#"+color4, padding: "10px"}}>color4</div>
          <div style={{backgroundColor: "#"+color5, padding: "10px"}}>color5</div>
        </div>

        <button onClick={generateRandomPalette}>random palette</button>
      
      
      
      </main>
    </>
  )
}
