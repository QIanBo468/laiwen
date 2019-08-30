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
  data() {
    return {
      show: true
    };
  }
};
</script>
<style lang="scss" scoped>
.tabbarcontent {
  min-height: calc(100vh - 60px); //可视窗口高度减去底部导航高度
  padding-bottom: 60px; //补足底部组件高度遮挡的部分
}
.fade-three-enter-active,
.fade-three-leave-active {
  transition: opacity 0.15s;
}
.fade-three-enter, .fade-three-leave-to /* .fade-three-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>