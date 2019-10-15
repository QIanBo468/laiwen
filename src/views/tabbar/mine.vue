<template>
  <div>
    <div class="nav">{{$t('navbar.我的')}}</div>

    <div class="user_data">
      <div class="img">
        <img src="@/assets/img/code.png" alt />
        <div class="type">A 套餐</div>
      </div>
      <div class="user_txt">
        <div class="title">
          <span>咸蛋</span>
          <div class="tag">资深总监</div>
        </div>
        <div class="content">ID:1234375@qq.com</div>
      </div>
      <img src="@/assets/img/more_small.png" alt />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.nav {
  height: 46px;
  text-align: center;
  line-height: 46px;
  color: #ffffff;
  font-size: 18px;
  background-color: #0c0c0c;
}

.user_data {
  display: flex;
  align-items: center;
  color: #fff;

  .img {
    width: 55px;
    height: 55px;
    overflow: hidden;
    margin: 15px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50px;
    }
    .type {
      transform: translateY(-100%);
      background: linear-gradient(
        89deg,
        rgba(254, 116, 116, 1) 0%,
        rgba(253, 170, 115, 1) 100%
      );
      border-radius: 50px;
      font-size: 11px;
      text-align: center;
    }
  }

  .user_txt {
    flex: 1;
    .title {
      display: flex;
      span {
        font-size: 18px;
      }
      .tag {
        color: #705827;
        padding: 0 11px 0 24px;
        margin-left: 10px;
        background-image: url(../../assets/img/bg1.png);
        background-size: 100% 100%;
      }
    }
    .content {
      font-size: 13px;
    }
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 26px;
  }
}
</style>
