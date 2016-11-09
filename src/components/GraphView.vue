<template>
	<div>
		<h1 style="color: red;"> {{messengerAlert}} </h1>
		<div v-for="show in singleList">
			<h2 style="color: white;">{{ show.data.host }}</h2>
			<h4 style="color: green;">{{ (show.data.alive === true) ? 'Host is connetion' : 'Host disconection' }}</h4>
			<h4 style="background-color: whitesmoke; color: teal;">{{ show.data.output }}</h4>
		</div>
		<!-- <h4 >{{ singleList[0].data.time }}</h4> <br> -->
		<!-- <canvas id='myFirstChart' width="400" height="400"></canvas> -->
	</div>
</template>

<script>
// import Chart from 'chart.js'
export default {
  name: 'GraphView',
  props: ['singleList', 'messengerAlert'],
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
