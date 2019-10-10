<template>
  <div class="index">
    <div class="nav"></div>

    <van-swipe :autoplay="3000" indicator-color="white" :height="160">
      <van-swipe-item v-for="item in 4">
        <img src="@/assets/img/banner.png" width="100%" height="100%" />
      </van-swipe-item>
    </van-swipe>

    <div class="my_notice">
      <img src="@/assets/img/tz.png" />
      <span>我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告</span>
      <router-link tag="div" to="noticeList" class="more">{{$t('index.更多')}}></router-link>
    </div>

    <div class="items">
      <router-link to="inCome" tag="div" class="item">
        <translate position="right">
          <span>{{$t('index.我的收益')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
      <router-link to class="item">
        <translate position="right">
          <span>{{$t('index.注册会员')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
      <router-link to class="item">
        <translate position="right">
          <span>{{$t('index.问题反馈')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
      <router-link to class="item">
        <translate position="right">
          <span>{{$t('index.公司简介')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.van-swipe {
  width: 92%;
  margin: 0 auto;
}
.nav {
  height: 46px;
  background-color: #0c0c0c;
}

.my_notice {
  width: 92%;
  margin: 14px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  background: rgba(223, 179, 36, 0.2);
  border-radius: 50px;
  padding: 6px 10px;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div {
    border-radius: 50px;
    background: rgba(165, 128, 33, 0.4);
    padding: 0 10px;
    font-size: 12px;
  }
}

.items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 92%;
  margin: 0 auto;

  .item {
    width: 48%;
    font-size: 20px;
    color: #ffffff;
    background-size: 100% 100%;
    padding: 27px 20px 45px;
    margin-bottom: 4%;

    &:nth-child(1) {
      background-image: url(../../assets/img/bg_2.png);
    }
    &:nth-child(2) {
      background-image: url(../../assets/img/bg_3.png);
    }
    &:nth-child(3) {
      background-image: url(../../assets/img/bg_5.png);
    }
    &:nth-child(4) {
      background-image: url(../../assets/img/bg_4.png);
    }

    img {
      width: 17px;
      height: 17px;
      margin-left: 8px;
    }
  }
}
</style>