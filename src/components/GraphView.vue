<template>
	<div>
		<h1 class='animated infinite fadeIn'>{{ singleList[0].data.host }}</h1>
		<h2 class='animated infinite fadeIn'>{{ singleList[0].data.output }}</h2>
		<h2 class='animated infinite fadeIn'>{{ singleList[0].data.time }}</h2> <br>
		<canvas id='myFirstChart' width="400" height="400"></canvas>
	</div>
</template>

<script>
// import Chart from 'chart.js'
export default {
  name: 'GraphView',
  props: ['singleList'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    chartBuild () {}
  }
}
</script>
