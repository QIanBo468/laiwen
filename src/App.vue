<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <!-- Platform Version: 4.10.3 -->
      <!-- Vanity Map Version: 4.10.3 -->
      <!-- CloudSearch Version: 4.10.3 -->
      <router-view v-if="show" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    return {
      show: true
    };
  },
  methods: {}
};
</script>

<style>
@import './assets/font/font.css';
.van-nav-bar .van-icon {
  color: black !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
[v-cloak] {
  display: none;
}

/* 
<!-- Crosslinker Version:  -->
<!-- Video Ingestion Version: -->
<!-- Journey Version: 4.10.3 --> */

/* // 点击遮罩层弹出框动画 */
.van-overlay:active + .van-dialog {
  animation: dialog 0.1s ease-in;
}
@keyframes dialog {
  0%,
  100% {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
  50% {
    transform: translate3d(-50%, -50%, 0) scale(1.1);
  }
}

/* input框动画 input:active {
  animation: btnanimte 0.2s ease-in;
} */

/* 按钮动画 */
button,
.animateBtn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}
button::after,
.animateBtn::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}
button:active::after,
.animateBtn:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
button:active,
.animateBtn:active {
  animation: btnanimte 0.1s ease-in;
}
@keyframes btnanimte {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
}
</style>
