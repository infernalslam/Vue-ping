<template>
  <div id="app">
    <input-view :ping="ping"></input-view>
    <!-- <view-list :pingList="pingList" :clear="clear" :sub="sub"></view-list> -->
    <graph-view :singleList="single"></graph-view>
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
      single: []
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
      setTimeout(() => {
        this.singleList(url)
      }, 3000)
    },
    singleList (url) {
      this.$http.get('http://localhost:4000/api/single').then(res => {
        this.single = res.data
        console.log(this.single)
      })
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

</style>
