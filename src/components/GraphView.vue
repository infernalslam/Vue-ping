<template>
	<div>
		<h1 style="color: red;"> {{messengerAlert}} </h1>
		<!-- <div v-for="show in single"> -->
			<h2 style="color: white;">{{ single[0].data.host }}</h2>
			<h4 style="color: green;">{{ (single[0].data.alive === true) ? 'Host is connetion' : 'Host disconection' }}</h4>
			<h4 style="background-color: whitesmoke; color: teal;">{{ single[0].data.output }}</h4>
		<!-- </div> -->
	</div>
</template>

<script>
export default {
  name: 'GraphView',
  props: ['single', 'messengerAlert'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
