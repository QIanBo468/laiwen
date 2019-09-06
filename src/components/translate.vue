<template>
  <div class="translate" :class="returnPosition">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    position: String,
    time: { type: Number, default: 0.5 }
  },
  computed: {
    returnPosition() {
      if (this.position === "top") return "translateTop";
      else if (this.position === "bottom") return "translateBtm";
      else if (this.position === "left") return "translateLeft";
      else if (this.position === "right") return "translateRight";
      else if (this.position === "suspension") return "translateinfinite";
    }
  }
};
</script>
<style scoped lang="scss">
.translate {
  transform: translate3d(0, 0, 0);
}
// 向上
.translateTop {
  animation: translateTop 0.5s ease;
}
@keyframes translateTop {
  0% {
    transform: translate3d(0, 100px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
// 向下
.translateBtm {
  animation: translateBtm 0.5s ease;
}
@keyframes translateBtm {
  0% {
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
// 向左
.translateLeft {
  animation: translateLeft 0.5s ease;
}
@keyframes translateLeft {
  0% {
    transform: translate3d(100px, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
// 向右
.translateRight {
  animation: translateRight 0.5s ease;
}
@keyframes translateRight {
  0% {
    transform: translate3d(-100px, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
// 无限上下交替
.translateinfinite {
  animation: translateinfinite 2s ease-in-out infinite;
}
@keyframes translateinfinite {
  0% {
    transform: translate3d(0, 2px, 0);
  }
  50% {
    transform: translate3d(0, -2px, 0);
  }
  100% {
    transform: translate3d(0, 2px, 0);
  }
}
</style>