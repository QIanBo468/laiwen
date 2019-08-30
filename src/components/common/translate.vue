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
    }
  }
};
</script>
<style scoped lang="scss">
.translate {
  transform: translate3d(0, 0, 0);
}
.translateTop {
  animation: translateTop 0.5s ease;
  -moz-animation: translateTop 0.5s ease;
  -webkit-animation: translateTop 0.5s ease;
  -o-animation: translateTop 0.5s ease;
  -ms-animation: translateTop 0.5s ease;
}
.translateBtm {
  animation: translateBtm 0.5s ease;
  -moz-animation: translateBtm 0.5s ease;
  -webkit-animation: translateBtm 0.5s ease;
  -o-animation: translateBtm 0.5s ease;
  -ms-animation: translateBtm 0.5s ease;
}
.translateLeft {
  animation: translateLeft 0.5s ease;
  -moz-animation: translateLeft 0.5s ease;
  -webkit-animation: translateLeft 0.5s ease;
  -o-animation: translateLeft 0.5s ease;
  -ms-animation: translateLeft 0.5s ease;
}
.translateRight {
  animation: translateRight 0.5s ease;
  -moz-animation: translateRight 0.5s ease;
  -webkit-animation: translateRight 0.5s ease;
  -o-animation: translateRight 0.5s ease;
  -ms-animation: translateRight 0.5s ease;
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
</style>