<template>
  <div id="app">
    <input-view :ping="ping"></input-view>
    <view-list :pingList="pingList" :clear="clear" :sub="sub"></view-list>
  </div>
</template>

<script>
import InputView from './components/InputView'
import ViewList from './components/ViewList'

export default {
  name: 'app',
  data () {
    return {
      url: '',
      pingList: ''
    }
  },
  mounted () {
  },
  components: {
    InputView,
    ViewList
  },
  methods: {
    ping (url) {
      let data = { url: url }
      this.$http.post('http://localhost:4000/urlping', data).then(res => { this.getList() })
    },
    getList () {
      this.$http.get('http://localhost:4000/api/data').then(res => { this.pingList = res.data })
    },
    clear (id) {
      this.$http.delete('http://localhost:4000/api/del/' + id).then(res => {})
    },
    sub (str) {
      let text = str.trim()
      let textChange = text.split('Ping')
      console.log(textChange[2])
      return textChange[2]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
