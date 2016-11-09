<template>
  <div>
    <form @submit.prevent="ping(url)">
    <span class="text-title">https</span>
    <span class="text-title2">://www.</span>
    <input type="text" class="search" v-model="url">
    <button class="btn-sub">Ping</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'InputView',
  data () {
    return {
      url: ''
    }
  },
  props: ['ping']
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic);
.text-title {
  color: #8BC34A;
font-family: 'Roboto';
}
.text-title2 {
  color: white;
font-family: 'Roboto';
}
.btn-sub {
  position: relative;
    overflow: hidden;
    width: 7rem;
    color: #5585ff;
    border: 2px solid #5585ff;
    background-color: transparent;
    cursor: pointer;
    line-height: 2;
    margin: 0;
    padding: 0;
    border-radius: 1.5rem;
    font-size: 1.125rem;
    text-transform: lowercase;
    outline: none;
    transition: transform .125s;
        margin-left: 16px;
}
.search {
  	font-family: 'Roboto';
    font-weight: 100;
    font-size: 22px;
      box-sizing: border-box;
      padding: 0 40px 0 10px;
      width: 300px;
      height: 50px;
      border: 4px solid white;
      border-radius: 0;
      background: none;
      color: #ffe662;
      font-family: Roboto;
      font-size: 16px;
      font-weight: 400;
      outline: 0;
      border-radius: 69px;
      -webkit-transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out, padding 0.2s;
      transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out, padding 0.2s;
      -webkit-transition-delay: 0.4s, 0s, 0.4s;
      transition-delay: 0.4s, 0s, 0.4s;
}
</style>
