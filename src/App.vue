<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-xs-12"><input-view :ping="ping"></input-view></div>
      </div>
      <div class="row">
      		  <div class="aspect-ratio">
		    <canvas id="chart"></canvas>
		  </div>
		</div>
	     <div class="row">
	        <div class="col-xs-4"><view-list :pingList="pingList" :clear="clear" :momentJs="momentJs"></view-list></div>
	        <div class="col-xs-4"><graph-view :single="single" :messengerAlert="messengerAlert"></graph-view></div>
	        <div class="col-xs-4"><button @click="repeat()"> Repeart</button></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputView from './components/InputView'
import ViewList from './components/ViewList'
import GraphView from './components/GraphView'
// import Chart from 'chart.js'
/* global moment, Chart */
Chart.defaults.global.animationEasing = 'easeInOutQuad'
Chart.defaults.global.responsive = true
Chart.defaults.global.scaleOverride = true
Chart.defaults.global.scaleShowLabels = false
Chart.defaults.global.scaleSteps = 10
Chart.defaults.global.scaleStepWidth = 10
Chart.defaults.global.scaleStartValue = 0
Chart.defaults.global.tooltipFontFamily = 'Open Sans'
Chart.defaults.global.tooltipFillColor = '#FFFFFF'
Chart.defaults.global.tooltipFontColor = '#6E6E6E'
Chart.defaults.global.tooltipCaretSize = 0
Chart.defaults.global.maintainAspectRatio = true
Chart.defaults.Line.scaleShowHorizontalLines = false
Chart.defaults.Line.scaleShowHorizontalLines = false
Chart.defaults.Line.scaleGridLineColor = '#55505C'
Chart.defaults.Line.scaleLineColor = '#55505C'
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
  },
  components: {
    InputView,
    ViewList,
    GraphView
  },
  methods: {
    ping (url) {
      this.count = 0
      var data = {}
      if (url.charAt(0) >= 0 && url.charAt(0) <= 9 && url.charAt(url.length - 1) >= 0 && url.charAt(url.length - 1)) {
        data = { url: url }
      } else {
        let text = url.split('//')
        let checkUrl = text[1].split('/')
        data = { url: checkUrl[0] }
      }
      this.$http.post('http://localhost:4000/urlping/', data).then(res => {})
      var vm = this
      setTimeout(() => {
        vm.singleList(url, data)
      }, 2000)
      setTimeout(() => {
        vm.singleList(url, data)
      }, 3000)
      setTimeout(() => {
        vm.singleList(url, data)
      }, 4000)
      setTimeout(() => {
        vm.singleList(url, data)
      }, 5000)
      setTimeout(() => {
        vm.singleList(url, data)
      }, 6000)
      setTimeout(() => {
        vm.singleList(url, data)
      }, 7000)
      setTimeout(() => {
        vm.singleList(url, data)
      }, 8000)
    },
    singleList (url, data) {
      console.log(url, data)
      this.$http.post('http://localhost:4000/api/single', data).then(res => {})
      this.$http.get('http://localhost:4000/api/single').then(res => {
        this.single = res.data
        this.buildChart(this.single)
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
    },
    buildChart () {
      var chart = document.getElementById('chart').getContext('2d')
      var gradient = chart.createLinearGradient(0, 0, 0, 450)
      var data = {
        labels: [ '1', '2', '3', '4', '5', '6' ],
        datasets: [
          {
            label: 'Custom Label Name',
            fillColor: gradient,
            strokeColor: '#FC2525',
            pointColor: 'white',
            pointStrokeColor: 'rgba(220,220,220,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: this.single.map(item => item.data.time)
          }
        ]
      }
      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
      chart = new Chart(chart).Line(data)
    },
    repeat () {
      this.$http.delete('http://localhost:4000/api/single').then(res => {
        this.single = res.data
      })
      var chart = document.getElementById('chart').getContext('2d')
      var gradient = chart.createLinearGradient(0, 0, 0, 450)
      var data = {
        labels: [ '1', '2', '3', '4', '5', '6' ],
        datasets: [
          {
            label: 'Custom Label Name',
            fillColor: gradient,
            strokeColor: '#FC2525',
            pointColor: 'white',
            pointStrokeColor: 'rgba(220,220,220,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      }
      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
      chart = new Chart(chart).Line(data)
    }
  }
}
</script>

<style>
body {
  /*background-color: #252320*/
  background-color: #252329;
}
*:before,
*:after {
  box-sizing: inherit;
}

/*html {
  box-sizing: border-box;
  background: #252329;
}*/

.l-chart {
  padding: 20px;
  background: #252329;
}

.aspect-ratio {
  height: 0;
  padding-bottom: 50%;
  /* 495h / 990w : The Intended dimensions */
}

</style>
