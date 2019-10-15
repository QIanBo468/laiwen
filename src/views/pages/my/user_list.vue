<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.我的资料')}}</span>
    </div>
    <div class="nav_box">
      <div class="nav_list"
           @click="show=true">
        <p>{{$t('my.头像')}}</p>
        <img src="@/assets/img/code.png"
             class="header_img">
        <img src="@/assets/img/more_small.png"
             alt="">
      </div>
      <router-link to='user_name'
                   class="nav_list">
        <p>{{$t('my.昵称')}}</p>
        <img src="@/assets/img/more_small.png"
             alt="">
      </router-link>
      <div class="nav_list">
        <p>{{$t('my.邮箱')}}</p>
        <p>19388887364@163.com</p>
      </div>
    </div>
    <div class="nav_box">
      <router-link to='about_us'
                   class="nav_list">
        <p>{{$t('my.关于我们')}}</p>
      </router-link>
    </div>
    <translate position="right"
               time="0.6s"
               class="img_box">
      <div v-if="show">
        <button class="one">{{$t('my.拍照')}}</button>
        <button class="two">{{$t('my.从相册中选择')}}</button>
        <button class="three"
                @click="show=false">{{$t('my.取消')}}</button>
      </div>
    </translate>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      actions: ['拍照', '从相册中选择']
    }
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.nav {
  height: 46px;
  background-color: #0c0c0c;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 35px;

  img {
    width: 24px;
    height: 24px;
    margin-left: 11px;
  }
  span {
    color: #ffffff;
    font-size: 18px;
    flex: 1;
    text-align: center;
  }
}
.nav_box {
  padding-top: 20px;
  .nav_list {
    display: inline-block;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
    background: #161102;
    color: #fff;
    img {
      width: 25px;
      height: 25px;
    }
    .header_img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      margin-right: 8px;
    }
    p {
      flex: 1;
      padding: 0 10px;
      text-align: left;
      color: #ffffff;
      font-size: 14px;
      display: flex;
      align-items: center;
      span {
        margin-right: 5px;
        display: inline-block;
        width: 4px;
        height: 4px;
        background: red;
        border-radius: 50%;
      }
    }
  }
}
.img_box {
  width: 100%;
  padding: 10px 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  button {
    text-align: center;
    width: 100%;
    padding: 15px 0;
    font-size: 20px;
    background: #fff;
  }
  .one {
    background: rgba(255, 255, 255, 0.72);
    opacity: 1;
    border-radius: 12px 12px 0px 0px;
    border-bottom: 1px solid #333;
    color: red;
  }
  .two {
    background: rgba(255, 255, 255, 0.72);
    opacity: 1;
    border-radius: 0px 0px 12px 12px;
  }
  .three {
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 10px;
    margin-top: 10px;
  }
}
</style>
