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
	        <div class="col-xs-4"><graph-view :singleList="single" :messengerAlert="messengerAlert"></graph-view></div>
	        <div class="col-xs-4"><div id='myChart'></div></div>
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
    // var chart = document.getElementById('chart').getContext('2d')
    // var gradient = chart.createLinearGradient(0, 0, 0, 450)
    // var data = {
    //   labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June' ],

    //   datasets: [
    //     {
    //       label: 'Custom Label Name',
    //       fillColor: gradient,
    //       strokeColor: '#FC2525',
    //       pointColor: 'white',
    //       pointStrokeColor: 'rgba(220,220,220,1)',
    //       pointHighlightFill: '#fff',
    //       pointHighlightStroke: 'rgba(220,220,220,1)',
    //       data: [65, 59, 80, 81, 56, 55]
    //     }
    //   ]
    // }
    // gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    // gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
    // gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    // chart = new Chart(chart).Line(data)
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
      } else {
        let text = url.split('//')
        let checkUrl = text[1].split('/')
        data = { url: checkUrl[0] }
      }
      this.$http.post('http://localhost:4000/urlping/', data).then(res => {})
      var vm = this
      setTimeout(() => {
        vm.singleList(url)
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
        this.buildChart(this.single[0].data.time)
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
    buildChart (time) {
      var chart = document.getElementById('chart').getContext('2d')
      var gradient = chart.createLinearGradient(0, 0, 0, 450)
      var data = {
        labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June' ],
        datasets: [
          {
            label: 'Custom Label Name',
            fillColor: gradient,
            strokeColor: '#FC2525',
            pointColor: 'white',
            pointStrokeColor: 'rgba(220,220,220,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [23, 10, 11, 3, 42, time]
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
