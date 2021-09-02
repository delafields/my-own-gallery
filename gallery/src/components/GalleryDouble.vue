<template>
  <div id="wrapper">
    <div id="palette-wrapper" style="border-bottom: 4px solid white;">
      <div v-for="hex in currentPaletteHex" 
          :key="hex" 
          class="palette"
          v-bind:style="{ backgroundColor: hex }"/>
    </div>
    <div id="image-wrapper">
      <transition name="slide-fade" mode="out-in">
        <figure :key="currentPaletteImages[currentImageIndex]['link']">
          <img v-bind:src="currentPaletteImages[currentImageIndex]['link']" 
              id="image"/>
          <figcaption 
            v-if="currentPaletteImages[currentImageIndex]['title'] in likedImages"
            id="image-name">
            {{ currentPaletteImages[currentImageIndex]['title'] }} ❤️
          </figcaption>
          <figcaption 
            v-else
            id="image-name">
            {{ currentPaletteImages[currentImageIndex]['title'] }}
          </figcaption>
        </figure>
      </transition>
      <div style="display: flex; flex-direction: row;">
        <button v-on:click="previousImage()">Previous</button>
        <button v-on:click="nextImage()">Next</button>
        <button v-on:click="newPalette()">New Palette</button>
        <button v-on:click="likeImage()" v-if="!(currentPaletteImages[currentImageIndex]['title'] in likedImages)">
          Like
        </button>
        <button v-on:click="likeImage()" v-else>Unlike</button>
      </div>
    </div>
    <div id="palette-wrapper" style="border-top: 4px solid white;">
      <div v-for="hex in currentPaletteHex" 
          :key="hex" 
          class="palette"
          v-bind:style="{ backgroundColor: hex }"/>
    </div>
    {{likedImages}}
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import imageJson from '../assets/image_links.json'

export default {
  name: 'GalleryDouble',
  data() {
    return {
      images: JSON.parse(JSON.stringify(imageJson)),
      currentPaletteKey: "",
      currentPaletteHex: "",
      currentPaletteImages: "",
      currentImageIndex: 0,
      likedImages: {}
    }
  },
  created() {
    const idx = Math.floor(Math.random() * Object.keys(this.images).length)
    this.currentPaletteKey = Object.keys(this.images)[idx]
    this.currentPaletteHex = this.images[this.currentPaletteKey]["palette_hex_codes"]
    this.currentPaletteImages = Object.values(this.images[this.currentPaletteKey]["images"])

    if (localStorage.likedImages) {
      this.likedImages = JSON.parse(localStorage.likedImages);
    }
  },
  methods: {
    previousImage: function() {
      this.currentImageIndex = this.currentImageIndex === 0 ? this.currentPaletteImages.length - 1 : this.currentImageIndex -= 1;
    },
    nextImage: function() {
      this.currentImageIndex = this.currentImageIndex === this.currentPaletteImages.length - 1 ? this.currentImageIndex = 0 : this.currentImageIndex += 1;
    },
    newPalette: function() {
      const idx = Math.floor(Math.random() * Object.keys(this.images).length)
      this.currentImageIndex = 0;
      this.currentPaletteKey = Object.keys(this.images)[idx]
      this.currentPaletteHex = this.images[this.currentPaletteKey]["palette_hex_codes"]
      this.currentPaletteImages = Object.values(this.images[this.currentPaletteKey]["images"])
    },
    likeImage: function() {
      // if in likedImages, remove
      const currentImageLink = this.currentPaletteImages[this.currentImageIndex]['link'];
      const currentImageTitle = this.currentPaletteImages[this.currentImageIndex]['title']
      const imageDict = {"link": currentImageLink, "hex_codes": this.currentPaletteHex};
      if (currentImageTitle in this.likedImages){
        delete this.likedImages[currentImageTitle]
      } 
      else {
        this.likedImages[currentImageTitle] = imageDict;
      }

      localStorage.likedImages = JSON.stringify(this.likedImages)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap');

/* fade images: https://forum.vuejs.org/t/how-to-add-animation-for-image-src-change/4720 */
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
} */
/* prefix with transition name */
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  /* transform: translateY(30px); */
  opacity: 0;
}

#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
  /* justify-content: center; */
}

#palette-wrapper {
  height: 10vh;
  display: flex;
  flex-direction: row;
  /* border-bottom: 4px solid white; */
  /* justify-content: space-around; */
}

.palette {
  flex-grow: 1;
}

#image-wrapper {
  height: 80vh;
  /* background-color: rgba(0, 0, 0, 0.95); */
  /* background-color: white; */
  background-color: #e6e0ce; /* fff9e5 */
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
  margin-top: 10px;
  max-width: 500px;
  font-family: 'IM Fell English', serif;
  text-align: center;
  font-size: 1.5rem;
  
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
