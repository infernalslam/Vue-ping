<template>
  <div id="app">
    <input-view :ping="ping"></input-view>
    <!-- <view-list :pingList="pingList" :clear="clear" :sub="sub"></view-list> -->
    <graph-view :singleList="singleList"></graph-view>
  </div>
</template>

<script>
import InputView from './components/InputView'
import ViewList from './components/ViewList'
import GraphView from './components/GraphView'
export default {
  name: 'app',
  data () {
    return {
      url: '',
      pingList: [],
      singleList: []
    }
  },
  mounted () {
    setInterval(() => {
      this.getList()
    }, 4000)
  },
  components: {
    InputView,
    ViewList,
    GraphView
  },
  methods: {
    ping (url) {
      let data = { url: url }
      this.$http.post('http://localhost:4000/urlping', data).then(res => {})
      this.singleList(url)
    },
    singleList (url) {
      this.$http.get('http://localhost:4000/api/single').then(res => { this.singleList = res.data })
    },
    getList () {
      this.$http.get('http://localhost:4000/api/data').then(res => { this.pingList = res.data })
    },
    clear (id) {
      this.$http.delete('http://localhost:4000/api/del/' + id).then(res => { this.getList() })
    },
    sub (str) {
      let text = str.trim()
      let search = str.search('Approximate round trip times in milli-seconds:')
      let max = text.substr(search, text.length)
      let maxstr = max.search('Minimum')
      let parameter = max.substr(maxstr, max.length).split('=')
      let parametertoNumber = parameter.join().split(',')
      console.log(parametertoNumber)
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
