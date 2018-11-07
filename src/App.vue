<!-- <template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Welcome to here</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *, *::before, *::after{
    box-sizing: border-box;
  }
  body {
    background: url('https://ws2.sinaimg.cn/large/a15b4afegy1fc6ok5m453j22bc1ji47p');
    background-size: cover;
  }
  #app{
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.4;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #32485F;
  }

  h1{
    text-align: center;
  }
</style> -->

<template>
  <div>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import svgIcon from './components/common/svg';
  export default {
    name: 'App',
    components: {
      svgIcon
    },
  }
</script>

<style lang="scss">
  @import './style/common';
  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }

</style>