<template>
  <div class="dashboard oh">
    <div class="container">
      <div class="demo">
        <img alt="Vue logo" src="../assets/images/logo.png" />
        <h2>Welcome to Dashboard Template</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from 'api/demo'
import resizeMixin from '../components/resize'

export default {
  name: 'dashboard',
  mixins: [resizeMixin],
  created() {
    getData().then(({ msg }) => {
      console.log(msg)
    })
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  transform-origin: top left;
  width: 0;

  .container,
  .container > div {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
}
.layout-1 {
  padding-left: 2304px;
  padding-top: 1024px;
  @include bgImage('../assets/images/bg.png');
  .demo {
    text-align: center;
    margin-top: 20vh;
    color: #fff;
  }
}
</style>
