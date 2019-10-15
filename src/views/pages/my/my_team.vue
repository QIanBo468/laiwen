<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.我的团队')}}</span>
    </div>
    <div class="user_data">
      <div class="img">
        <img src="@/assets/img/code.png"
             alt />
      </div>
      <div class="user_txt">
        <div class="title">
          <span>咸蛋</span>
          <div class="tag">资深总监</div>
        </div>
        <div class="content">ID:1234375@qq.com</div>
      </div>
    </div>
    <div class="list_box">
      <div>
        <p>{{$t('my.已获得推广收益')}}</p>
        <p style="font-size: 28px;">2837483947.0000</p>
        <div>
          <div>
            <p style="font-size: 16px;">{{$t('my.团队总人数')}}</p>
            <p>10000{{$t('my.人')}}</p>
          </div>
          <div>
            <p style="font-size: 16px;">{{$t('my.直推用户')}}</p>
            <p>10000{{$t('my.人')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="item"
           v-for="item in 14">
        <div class="text">
          <div>咸**豆</div>
          <div>2019-9-26 11:19:21</div>
        </div>
        <span>120,0000</span>
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
        background-image: url(../../../assets/img/bg1.png);
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
    margin-right: 15px;
  }
}
.list_box {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  > div {
    background: linear-gradient(
      137deg,
      rgba(246, 180, 109, 1) 0%,
      rgba(236, 128, 24, 1) 100%
    );
    opacity: 1;
    border-radius: 6px;
    padding: 5px 15px;
    > p {
      color: #fff;
      font-size: 16px;
      padding: 8px 0;
    }
    > div {
      width: 100%;
      margin-top: 12px;
      border-top: 1px solid #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 5px;
      > div {
        width: 50%;
        border-right: 1px solid #fff;
        color: #fff;
        font-size: 18px;
      }
      > div:last-child {
        border-right: none;
        padding-left: 20px;
      }
    }
  }
}
.box {
  width: 100%;
  background: #271b00;
  margin-top: 14px;
  padding-bottom: 10px;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #281a00;
    padding: 11px 26px;
    border-bottom: 1px solid rgba(67, 46, 0, 1);

    .text {
      div {
        &:first-child {
          color: #ffffff;
          font-size: 14px;
        }

        &:last-child {
          color: #c7c7cc;
          font-size: 12px;
        }
      }
    }

    span {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
