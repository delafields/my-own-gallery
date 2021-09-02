<template>
  <div id="wrapper">
    <div id="palette-wrapper">
      <div v-for="hex in currentPaletteHex" 
          :key="hex" 
          class="palette"
          v-bind:style="{ backgroundColor: hex }"/>
    </div>
    <div id="image-wrapper">
      <img 
        v-bind:src="currentPaletteImages[currentImageIndex]['link']"
        id="image">
      <div id="image-name">
        <h3>{{ currentPaletteImages[currentImageIndex]['title'] }}</h3>
      </div>
      <button v-on:click="previousImage()">Previous</button>
      <button v-on:click="nextImage()">Next</button>
      <button v-on:click="newPalette()">New Palette</button>
      <button>Like</button>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import imageJson from '../assets/image_links.json'

export default {
  name: 'Gallery',
  data() {
    return {
      images: JSON.parse(JSON.stringify(imageJson)),
      currentPaletteKey: "",
      currentPaletteHex: "",
      currentPaletteImages: "",
      currentImageIndex: 0
    }
  },
  created() {
    const idx = Math.floor(Math.random() * Object.keys(this.images).length)
    this.currentPaletteKey = Object.keys(this.images)[idx]
    this.currentPaletteHex = this.images[this.currentPaletteKey]["palette_hex_codes"]
    this.currentPaletteImages = Object.values(this.images[this.currentPaletteKey]["images"])
  },
  methods: {
    previousImage: function() {
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.currentPaletteImages.length - 1;
      } 
      else {
        this.currentImageIndex -= 1;
      }
    },
    nextImage: function() {
      if (this.currentImageIndex === this.currentPaletteImages.length - 1) {
        this.currentImageIndex = 0;
      } 
      else {
        this.currentImageIndex += 1;
      }
    },
    newPalette: function() {
      const idx = Math.floor(Math.random() * Object.keys(this.images).length)
      this.currentImageIndex = 0;
      this.currentPaletteKey = Object.keys(this.images)[idx]
      this.currentPaletteHex = this.images[this.currentPaletteKey]["palette_hex_codes"]
      this.currentPaletteImages = Object.values(this.images[this.currentPaletteKey]["images"])
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap');

#title-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  /* justify-content: center; */
}

#palette-wrapper {
  height: 10vh;
  display: flex;
  flex-direction: row;
  border-bottom: 4px solid white;
  /* justify-content: space-around; */
}

.palette {
  flex-grow: 1;
}

#image-wrapper {
  height: 90vh;
  /* background-color: rgba(0, 0, 0, 0.95); */
  /* background-color: white; */
  background-color: #e6e0ce; /* fff9e5 */
  background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#image {
  /* height: 100% */
  /* filter: drop-shadow(0 0 0.75rem #fff9e5); */
  filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.479));
  max-height: 60vh
}

#image-name {
  /* background-color: rgba(0, 0, 0, 0.1); */
  /* background-color: black; */
  margin-top: 20px;
  padding: 0px 40px 0px 40px;
  max-width: 300px;
}

h1 {
  color: white;
  font-family: 'IM Fell English', serif;
}

h3 {
  color: black;
  font-family: 'IM Fell English', serif;  
}
</style>
