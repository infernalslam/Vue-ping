<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-xs-12"><input-view :ping="ping"></input-view></div>
      </div>
      <div class="row">
        <div class="col-xs-4"><view-list :pingList="pingList" :clear="clear" :momentJs="momentJs"></view-list></div>
        <div class="col-xs-4"><graph-view :singleList="single" :messengerAlert="messengerAlert"></graph-view></div>
        <div class="col-xs-4"><div id='myChart'></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import InputView from './components/InputView'
import ViewList from './components/ViewList'
import GraphView from './components/GraphView'
// import Chart from 'chart.js'
/* global moment, zingchart */
export default {
  name: 'app',
  data () {
    return {
      url: '',
      pingList: [],
      single: [],
      messengerAlert: ''
    }
  },
  mounted () {
    let vm = this
    setInterval(() => {
      vm.getList()
    }, 4000)
    zingchart.render({
      id: 'myChart',
      data: {
        type: 'line',
        series: [{
          values: [54, 23, 34, 23, 43]
        }, {
          values: [10, 15, 16, 20, 40]
        }]
      }
    })
  },
  components: {
    InputView,
    ViewList,
    GraphView
  },
  methods: {
    ping (url) {
      var data = {}
      if (url.charAt(0) >= 0 && url.charAt(0) <= 9 && url.charAt(url.length - 1) >= 0 && url.charAt(url.length - 1)) {
        data = { url: url }
        console.log('ip address')
      } else {
        let text = url.split('//')
        let checkUrl = text[1].split('/')
        data = { url: checkUrl[0] }
        console.log('www name host')
      }
      this.$http.post('http://localhost:4000/urlping/', data).then(res => {})
      var vm = this
      setTimeout(() => {
        vm.singleList(url)
        vm.buildChart()
      }, 2000)
    },
    singleList (url) {
      this.$http.get('http://localhost:4000/api/single').then(res => {
        this.single = res.data
        if (this.single[0].data.alive === false) {
          this.messengerAlert = 'Pls check ip address'
        } else if (this.single[0].data.alive === true) {
          this.messengerAlert = ''
        }
      })
    },
    getList () {
      this.$http.get('http://localhost:4000/api/data').then(res => {
        this.pingList = res.data
      })
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
      return parametertoNumber
    },
    momentJs (time) {
      return moment(time).startOf().fromNow()
    }
  }
}
</script>

<style>
body {
  background-color: #252320;
}
</style>
