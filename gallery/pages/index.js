import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
// import ColorPicker from '../components/ColorPicker';

const ColorPicker = ({ index, color, onColorChange, generateHexCode }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    onColorChange(index, newColor);
  };

  return (
    <div className="relative w-1/5">
      {color 
        ?  <div
              className="relative h-[150px] bg-gray-300 cursor-pointer"
              style={{ backgroundColor: color }}
              onMouseEnter={() => setShowPicker(true)}
              onMouseLeave={() => setShowPicker(false)}
            >
              {showPicker && (
                <div className="absolute z-10 w-full">
                  {index != 0 ? (
                    <button 
                    className='absolute w-full -translate-y-6 align-center'
                    onClick={() => handleColorChange(null)}
                    >🗑️</button>
                  ) : null}
                    <HexColorPicker 
                      style={{width: 'auto', height: '150px'}}
                      // className='absolute z-10'
                      color={color} onChange={handleColorChange} />
                </div>
              )}
            </div>
        : <button 
            style={{ backgroundColor: color }}
            className='w-full h-full'
            onClick={(c) => handleColorChange(generateHexCode())}
          >
          +
          </button>

      }
    </div>
  );
};


const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
  const nextImageIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;

  const handlePrevClick = () => {
    setCurrentImageIndex(prevImageIndex);
  };

  const handleNextClick = () => {
    setCurrentImageIndex(nextImageIndex);
  };
  // picture frame: https://codepen.io/chris22smith/pen/PbBwjp
  return (
    <div className="relative flex justify-center w-full h-full">
      <div className="relative w-11/12 mt-4 h-5/6">
        {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt="image"
              layout="fill"
              objectFit="contain"
              className={`absolute drop-shadow-md top-0 left-0 transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />

        ))}
      </div>

      <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full">
        <button onClick={handlePrevClick} className="p-2 text-white bg-gray-800 hover:bg-gray-700">
          Prev
        </button>
        <button onClick={handleNextClick} className="p-2 text-white bg-gray-800 hover:bg-gray-700">
          Next
        </button>
      </div>

      <div 
        className='absolute bottom-0 flex items-center justify-center w-64 h-24 p-4 bg-amber-50 right-10 drop-shadow-md'
        style={{background: '#FFFBEBff&noise=626262&density=8&opacity=9', backgroundUrl: 'http://api.thumbr.it/whitenoise-361x370.png?'}}
      >
        <p className='font-bold text-black'>{images[currentImageIndex].title}</p>
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
        console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
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
      <main className="flex flex-col h-screen bg-white">
        
        {images 
          ? <ImageCarousel images={images} />
          : <></>
        }
          

        <div className='flex flex-col justify-between h-1/5'>

          <div className='flex items-center justify-center gap-4 grow'>
            <button className='px-2 py-1 rounded-lg bg-slate-700' onClick={generateRandomPalette}>random palette</button>
            <button className='px-2 py-1 rounded-lg bg-slate-700' onClick={fetchPalette}>fetch new images</button>
          </div>

          <div className='flex justify-between w-full'>
            {colors.map((color, index) => (
              <ColorPicker 
                key={index} 
                index={index} 
                color={color} 
                onColorChange={handleColorChange}
                generateHexCode={generateHexCode}
              />
            ))}
          </div>

        </div>
      
      </main>
    </>
  )
}
