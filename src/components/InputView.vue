<template>
  <div>
    url : <input type="text" v-model="url"> <button @click="ping(url)">Send</button>
  </div>
</template>

<script>
export default {
  name: 'InputView',
  data () {
    return {
      url: ''
    }
  },
  props: ['ping']
}
</script>

<style scoped>

</style>
