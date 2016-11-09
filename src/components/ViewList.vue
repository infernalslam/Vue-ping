<template>
	<div>
			<div v-for="show in pingList">
					<span class="glyphicon glyphicon-trash color" aria-hidden="true" @click="clear(show.id)"></span>
		      <span class="text-host"> Ping web > {{show.data.host}} </span>
					<br>
		      <span class="App">Approximate round trip times in milli-seconds</span>
					<span class="time">: {{show.data.time}}</span><span style="color: #5585ff;"> Ping </span>
					<br>
					{{momentJs(show.id)}}
					<hr>
		    </div>
	</div>
</template>

<script>
export default {
  name: 'app',
  props: ['pingList', 'clear', 'momentJs']
}
</script>

<style>
.color {
	color: white;
	padding-right: 13px;
}
.text-host {
	color: white;
}
.App {
	color: #7bc346;
}
.time {
	color: white;
}
</style>
