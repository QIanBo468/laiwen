<!-- 底部 -->
<template>
  <div class="footBox">
    <div class="navFoot">
      <div
        v-for="item in tabBarArr"
        :ref="'btn'+item.id"
        class="tab-item"
        :class="{ bigItem: item.routeName === $route.name }"
        :key="item.id"
        @click="switchTo(item.routeName, item.id, $event)"
      >
        <img :src="item.routeName === $route.name ? item.selected : item.normal" />
        <span :class="{on: item.routeName === $route.name}">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * 配置底部导航默认图标、选中图标、路由名称、页面展示名称
       * id 为底部for循环key值,不可重复
       */
      tabBarArr: [
        {
          id: 0, //ID号
          name: "首页", //名称
          routeName: "/", //路由名称
          normal: require("@/assets/img/1.png"), //未选中时图标
          selected: require("@/assets/img/1-00.png") //选中时图标
        },
        {
          id: 1, //ID号
          name: "第二页", //名称
          routeName: "mine", //路由名称
          normal: require("@/assets/img/2.png"), //未选中时图标
          selected: require("@/assets/img/2-00.png") //选中时图标
        }
      ]
    };
  },
  methods: {
    switchTo(routeName, id, e) {
      this.$_clickAnimate(this.$refs["btn" + id][0], e.pageX, e.pageY);
      // 如果当前路由等于传入的路由则不触发跳转方法
      if (this.$route.name === routeName) return;
      this.$router.replace(routeName);
    }
  }
};
</script>
<style scoped lang="scss">
.bigItem {
  border-radius: 50px;
  z-index: +1;
}
.bigItem > img {
  animation: animateImg 0.9s ease-in-out;
  -moz-animation: animateImg 0.9s ease-in-out;
  -webkit-animation: animateImg 0.9s ease-in-out;
  -o-animation: animateImg 0.9s ease-in-out;
  -ms-animation: animateImg 0.9s ease-in-out;
}

@keyframes animateImg {
  0% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(0, -40%, 0);
  }
  75% {
    transform: translate3d(0, 15%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.footBox {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
}
.navFoot {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tab-item {
  position: relative;
  box-sizing: border-box;
  outline: none;
  border: none;
  flex: 1;
  padding: 6px 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tab-item:active {
  // animation: tabAnimate 0.15s ease-in;
  // transform: scale(0.9);
}
@keyframes tabAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
}
.tab-item > img {
  height: 24px;
}
.tab-item > span {
  font-size: 11px;
  font-weight: 400;
  color: #999999;
}
.tab-item > .on {
  color: $主题色;
}
</style>