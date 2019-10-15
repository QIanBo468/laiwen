<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.邀请好友')}}</span>
    </div>
    <div class="box">
      <p>{{$t('my.莱文资本邀请您注册及下载')}}</p>
      <div>
        <p style="font-size: 16px;">{{$t('my.注册邀请码')}}</p>
        <p>19388887364@163.com</p>
        <button>{{$t('assets.复制')}}</button>
        <p class="xian"></p>
        <img src="@/assets/img/code.png"
             alt="">
        <button>{{$t('my.邀请好友')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
.box {
  box-sizing: border-box;
  width: 100%;
  padding: 30px 40px 0 40px;
  > p {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  div {
    width: 100%;
    background: linear-gradient(
      137deg,
      rgba(233, 215, 177, 1) 0%,
      rgba(200, 168, 113, 1) 100%
    );
    opacity: 1;
    border-radius: 6px;
    padding: 25px 15px 5px 15px;
    text-align: center;
    color: #705827;
    font-size: 20px;
    > p {
      margin-bottom: 20px;
    }
    button {
      padding: 8px 20px;
      color: #ffffff;
      margin: 0 auto;
      background: linear-gradient(
        137deg,
        rgba(246, 180, 109, 1) 0%,
        rgba(236, 128, 24, 1) 100%
      );
      box-shadow: 0px 10px 10px rgba(185, 93, 3, 0.3);
      opacity: 1;
      border-radius: 18px;
      margin-bottom: 30px;
    }
    .xian {
      border-bottom: 1px dashed #0c0c0c;
    }
    > img {
      width: 120px;
      height: 120px;
      margin-bottom: 25px;
    }
  }
}
</style>
