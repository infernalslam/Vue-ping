<template>
	<div>
		<div v-for="show in pingList">
	      <button @click="clear(show.id)">X</button>
	      {{show.data.host}} <br>
	      {{ sub(show.data.output)}} <br> <hr>
	    </div>
	</div>
</template>

<script>
export default {
  name: 'app',
  props: ['pingList', 'clear', 'sub']
}
</script>