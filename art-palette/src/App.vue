<template>
  <div id="nav">
  <transition name="fade" mode="out-in">
    <router-view :key="$route.path" />
  </transition>
  </div>

</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.slide-enter,
.slide-leave-active {
  opacity: 0
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
