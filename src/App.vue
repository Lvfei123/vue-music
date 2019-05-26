<template>
  <div class="container">
    <Topbar></Topbar>
    <div class="space"></div>
      <router-view></router-view>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'
export default {   
  name: 'app',
  components:{
    Topbar
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: 0 auto;
}
.el-icon-service {
  font-size: 50px;
  font-weight: 600;
}
.space {
  height: 70px;
}
</style>
