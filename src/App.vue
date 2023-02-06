<template>
  <QuotePage />
</template>

<script>
import QuotePage from './components/QuotePage.vue';

export default {
  name: 'App',
  components: {
    QuotePage
}
}
</script>

<style>
#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  margin-top: 80px;
}

body {
  background: #015461;
}
</style>
