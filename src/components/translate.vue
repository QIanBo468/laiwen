<template>
  <div class="translate" :class="position">
    <!-- Reactive, component-oriented view layer for modern web interfaces -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  /**
   * top 向上滑动
   * bottom 向下滑动
   * left 向左滑动
   * right 向右滑动
   * suspension 悬浮按钮上下漂浮效果
   * flash 闪光,浮光掠影
   */
  props: {
    position: String
  }
};
</script>
<style scoped lang="scss">
.translate {
  transform: translate3d(0, 0, 0);
}

.top {
  animation: top 0.5s ease;
}
@keyframes top {
  0% {
    transform: translate3d(0, 100px, 0);
    opacity: 0;
    filter: blur(2px);
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    filter: blur(0px);
  }
}

.bottom {
  animation: bottom 0.5s ease;
}
@keyframes bottom {
  0% {
    transform: translate3d(0, -100px, 0);
    opacity: 0;
    filter: blur(2px);
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    filter: blur(0px);
  }
}

.left {
  animation: left 0.5s ease;
}
@keyframes left {
  0% {
    transform: translate3d(100px, 0, 0);
    opacity: 0;
    filter: blur(2px);
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    filter: blur(0px);
  }
}

.right {
  animation: right 0.5s ease;
}
@keyframes right {
  0% {
    transform: translate3d(-100px, 0, 0);
    opacity: 0;
    filter: blur(2px);
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    filter: blur(0);
  }
}

.suspension {
  animation: suspension 2s ease-in-out infinite alternate;
}
@keyframes suspension {
  from {
    transform: translate3d(0, 2px, 0);
  }
  to {
    transform: translate3d(0, -2px, 0);
  }
}

.flash {
  overflow: hidden;
}
.flash::before {
  content: "";
  position: absolute;
  width: 20px;
  top: 0;
  height: 100%;
  opacity: 0.4;
  transform: skewX(-30deg);
  transform-origin: 0 100%;
  background-color: #fff;
  animation: btn_before 4s infinite;
}
@keyframes btn_before {
  0% {
    left: -100%;
  }
  25% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>