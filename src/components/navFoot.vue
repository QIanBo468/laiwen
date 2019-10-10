<!-- 底部 -->
<template>
  <div class="footBox">
    <div class="navFoot">
      <div
        v-for="item in tabBarArr"
        ref="btn"
        class="tab-item"
        :class="{ bigItem: item.routeName === $route.name }"
        :key="item.id"
        @click="switchTo(item.routeName, item.id, $event)"
      >
      <!-- @albertfdp/unexpected-htmllike-reactrendered-adapter -->
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
       * 
       * id 为底部for循环key值,不可重复
       */
      tabBarArr: [
        {
          id: 0, //ID号
          name: this.$t('navbar.首页'), //名称
          routeName: "/", //路由名称
          normal: require("@/assets/img/home (2).png"), //未选中时图标
          selected: require("@/assets/img/home.png") //选中时图标
        },
        {
          id: 1, //ID号
          name: this.$t('navbar.投资'), //名称
          routeName: "investment", //路由名称
          normal: require("@/assets/img/taocan.png"), //未选中时图标
          selected: require("@/assets/img/taocan (2).png") //选中时图标
        },
        {
          id: 2, //ID号
          name: this.$t('navbar.资产'), //名称
          routeName: "assets", //路由名称
          normal: require("@/assets/img/qianbao.png"), //未选中时图标
          selected: require("@/assets/img/qianbao (2).png") //选中时图标
        },
        {
          id: 3, //ID号
          name: this.$t('navbar.我的'), //名称
          routeName: "mine", //路由名称
          normal: require("@/assets/img/WD 1.png"), //未选中时图标
          selected: require("@/assets/img/WD 1 (2).png") //选中时图标
        }
      ]
    };
  },
  methods: {
    switchTo(routeName, id) {
      if (this.$route.name === routeName) return;
      this.$router.replace(routeName);
    }
  },
  mounted() {
    this.$refs.btn.map(item => {
      item.addEventListener("touchstart", e => {
        this.$_clickAnimate(item, e.touches[0].pageX, e.touches[0].pageY, "rgba(74, 51, 0, 0.2)");
      });
    });
  }
};
</script>
<style scoped lang="scss">
.bigItem {
  z-index: +1;
}
.bigItem > img {
  animation: animateImg 0.9s ease-in-out;
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
  background: #161102;
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
  background: #161102;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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