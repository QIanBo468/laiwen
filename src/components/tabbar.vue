<template>
  <div class="tabbarcontent">
    <transition name="fade-three" mode="out-in">
      <!-- Platform Version: 4.10.3 -->
      <!-- Vanity Map Version: 4.10.3 -->
      <!-- CloudSearch Version: 4.10.3 -->
      <router-view v-if="show" />
    </transition>
    <navFoot></navFoot>
  </div>
</template>
<script>
export default {
  name: "tabbar",
  data() {
    return {
      show: true
    };
  }
};
</script>
<style lang="scss" scoped>
.tabbarcontent {
  min-height: calc(100vh - 60px); 
  padding-bottom: 60px;
}
// Journey Version: 4.10.3  */
.fade-three-enter-active,
.fade-three-leave-active {
  transition: opacity 0.15s;
}
.fade-three-enter, .fade-three-leave-to /* .fade-three-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>