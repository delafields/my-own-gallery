<template>
  <div id="wrapper">
    <div id="palette-wrapper" style="border-bottom: 4px solid white;">
      <div v-for="hex in currentImageHex" 
          :key="hex" 
          class="palette"
          v-bind:style="{ backgroundColor: hex }"/>
    </div>
    <div id="image-wrapper">
      <h2 class="heart" id="leftHeart" v-if="currentImageTitle in likedImages">❤️</h2>
      <h2 class="heart" id="rightHeart" v-if="currentImageTitle in likedImages">❤️</h2>
      <transition name="fade" mode="out-in">
        <figure :key="currentImageSrc">
          <img v-bind:src="currentImageSrc" id="image"/>
          <figcaption id="image-name">{{ currentImageTitle }}</figcaption>
        </figure>
      </transition>
      <div style="display: flex; flex-direction: row;">
        <button v-on:click="previousImage()">Previous</button>
        <button v-on:click="nextImage()">Next</button>
        <button v-on:click="likeImage()" v-if="!(currentImageTitle in likedImages)">
          Like
        </button>
        <button v-on:click="likeImage()" v-else>Unlike</button>
        <button><router-link to="/">Home</router-link></button>
      </div>
    </div>
    <div id="palette-wrapper" style="border-top: 4px solid white;">
      <div v-for="hex in currentImageHex" 
          :key="hex" 
          class="palette"
          v-bind:style="{ backgroundColor: hex }"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      likedImages: JSON.parse(localStorage.likedImages),
      currentImageTitle: "",
      currentImageIdx: 0
    }
  },
  computed: {
    currentImageSrc() {
      return this.likedImages[this.currentImageTitle]["link"]
    },
    currentImageHex() {
      return this.likedImages[this.currentImageTitle]["hex_codes"]
    }
  },
  created() {
    // MUST FIGURE OUT HOW TO SHUFFLE OBJECT!!
    
    const random_idx = Math.floor(Math.random() * Object.keys(this.likedImages).length)
    this.currentImageTitle = Object.keys(this.likedImages)[random_idx];
    this.currentImageIdx = random_idx;
  },
  methods: {
    previousImage: function() {
      if (this.currentImageIdx === 0) {
        this.currentImageIdx = Object.keys(this.likedImages).length - 1;
        this.currentImageTitle = Object.keys(this.likedImages)[this.currentImageIdx]
      }
      else {
        this.currentImageIdx--;
        this.currentImageTitle = Object.keys(this.likedImages)[this.currentImageIdx]
      }
    },
    nextImage: function() {
      // this.currentImageIndex = this.currentImageIndex === this.currentPaletteImages.length - 1 ? this.currentImageIndex = 0 : this.currentImageIndex += 1;
      if (this.currentImageIdx === Object.keys(this.likedImages).length - 1) {
        this.currentImageIdx = 0;
        this.currentImageTitle = Object.keys(this.likedImages)[this.currentImageIdx]
      }
      else {
        this.currentImageIdx++;
        this.currentImageTitle = Object.keys(this.likedImages)[this.currentImageIdx]
      }
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-out;
}

.fade-enter, .fade-leave-to {
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

.heart {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  z-index: 10;
}

#leftHeart {
  left: 10%;
}
#rightHeart {
  right: 10%;
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