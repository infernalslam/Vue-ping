<template>
	<div>
		<div v-for="show in singleList">
			{{show.data.host}} <br>
			{{show.data.alive}} <br>
			{{sub(show.data.output)}} <br>
			{{show.data.time}} <hr>
		</div>
	</div>
</template>

<script>
export default {
  name: 'GraphView',
  props: ['singleList', 'sub']
}
</script>