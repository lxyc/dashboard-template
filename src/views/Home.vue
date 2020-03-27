<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome to Dashboard Template" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld'
import { getData } from 'api/demo'

export default {
  name: 'Home',
  created() {
    getData().then(({ msg }) => {
      console.log(msg)
    })
  },
  components: {
    HelloWorld
  }
}
</script>
