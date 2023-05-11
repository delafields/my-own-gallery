import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect, useCallback } from "react";
import { HexColorPicker } from "react-colorful";

const ColorPicker = ({ index, color, onColorChange, generateHexCode }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    onColorChange(index, newColor);
  };

  return (
    <div className="relative w-1/6">
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
                      style={{width: 'auto', height: '140px'}}
                      color={color} onChange={handleColorChange} />
                </div>
              )}
            </div>
        : <button 
            style={{ backgroundColor: color }}
            className='w-full h-full text-3xl font-extrabold text-black border-l-2'
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

  const handlePrevClick = useCallback(() => {
    setCurrentImageIndex(prevImageIndex);
  }, [prevImageIndex]);

  const handleNextClick = useCallback(() => {
    setCurrentImageIndex(nextImageIndex);
  }, [nextImageIndex]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevClick();
      } else if (e.key === 'ArrowRight') {
        handleNextClick();
      }
    },
    [handlePrevClick, handleNextClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // picture frame: https://codepen.io/chris22smith/pen/PbBwjp
  return (
    <>
      <div className="relative w-11/12 mt-4 h-5/6">
        {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt="image"
              layout="fill"
              objectFit="contain"
              className={`absolute drop-shadow-lg top-0 left-0 transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />

        ))}
      </div>

      {images[currentImageIndex].title
        ? <div className='absolute bottom-0 flex items-center justify-center w-64 h-24 p-4 mb-10 bg-amber-100 bg-fuzz right-10 drop-shadow-md'>
            <p className='font-bold text-black'>{images[currentImageIndex].title}</p>
          </div>
        : <></>
      }

      </>
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

        <div className="relative flex justify-center w-full h-full">
          {images 
            ? <ImageCarousel images={images} />
            : <p>Loading....</p>
          }
        </div>
          

          {/* <div className='flex items-center justify-center gap-4 mb-6 grow'>
            <button className='px-2 py-1 font-bold text-black rounded-lg' onClick={generateRandomPalette}>RANDOM</button>
            <button className='px-2 py-1 font-bold text-black rounded-lg' onClick={fetchPalette}>NEW</button>
          </div> */}

          <div className='flex w-full drop-shadow-[0_-8px_8px_rgba(0,0,0,0.2)]'>
            
            {colors.map((color, index) => (
              <ColorPicker 
                key={index} 
                index={index} 
                color={color} 
                onColorChange={handleColorChange}
                generateHexCode={generateHexCode}
              />
            ))}
            
            <div className='flex flex-col justify-center h-full gap-4 border-l-2 grow'>
              <button className='px-2 py-1 font-bold text-black rounded-lg hover:text-slate-600' onClick={generateRandomPalette}>RANDOM</button>
              <button className='px-2 py-1 font-bold text-black rounded-lg hover:text-slate-600' onClick={fetchPalette}>FETCH</button>
            </div>

          </div>

      
      </main>
    </>
  )
}
