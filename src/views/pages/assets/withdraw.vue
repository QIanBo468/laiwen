<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.提现')}}</span>
    </div>

    <div class="card">
      <div class="title">
        <span>{{$t('assets.莱文币')}}</span>
      </div>
      <div class="money">232323</div>
    </div>

    <div class="items">
      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.提现至')}}</span>
        </div>
        <div class="drop_down">
          <van-radio-group v-model="radio" checked-color="#C8A871">
            <div class="drop_item">
              <img src="@/assets/img/zfb.png" alt />
              <span>{{$t('assets.支付宝')}}</span>
              <van-radio name="1"></van-radio>
            </div>
            <div class="drop_item">
              <img src="@/assets/img/wx.png" alt />
              <span>{{$t('assets.微信')}}</span>
              <van-radio name="2"></van-radio>
            </div>
            <router-link to="myBankCard" tag="div" class="drop_item">
              <img src="@/assets/img/yhk.png" alt />
              <span>{{$t('assets.银行卡')}}</span>
              <img src="@/assets/img/in2.png" alt />
            </router-link>
          </van-radio-group>
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.提现金额')}}</span>
        </div>
        <div class="input">
          <input type="number" :placeholder="$t('assets.请输入提现金额')" />
          <span>全部</span>
        </div>

        <div class="remark">
          <span>手续费</span>
          <span>4%</span>
        </div>
        <div class="remark">
          <span>实际到账</span>
          <span>0</span>
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.二级密码')}}</span>
        </div>
        <div class="input">
          <input type="password" :placeholder="$t('assets.请输入二级密码')" />
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.安全验证')}}（188****5689）</span>
        </div>
        <div class="input">
          <input type="text" :placeholder="$t('login.请输入验证码')" />
          <button>{{$t('assets.获取')}}</button>
        </div>
      </div>

      <button class="save_login">{{$t('assets.提现')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      radio: "2"
    };
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

.card {
  width: calc(100% - 30px);
  margin: 15px auto;
  background: linear-gradient(
    137deg,
    rgba(246, 180, 109, 1) 0%,
    rgba(236, 128, 24, 1) 100%
  );
  border-radius: 6px;
  padding-bottom: 30px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 16px 25px;

    > span {
      color: #ffffff;
      font-size: 16px;
    }
  }
  .money {
    font-size: 28px;
    color: #ffffff;
    padding-left: 25px;
    margin-bottom: 16px;
  }
}

.items {
  padding: 13px 16px;

  .item {
    .title {
      color: #ffffff;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      i {
        width: 6px;
        height: 16px;
        display: inline-block;
        background: linear-gradient(
          180deg,
          rgba(255, 147, 12, 1) 0%,
          rgba(255, 80, 0, 1) 100%
        );
        opacity: 1;
        border-radius: 3px;
        margin-right: 8px;
      }
    }
    .drop_down {
      margin-bottom: 15px;
      border-radius: 6px;
      overflow: hidden;

      .drop_item {
        color: #ffffff;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #281a00;
        border-bottom: 1px solid rgba(67, 46, 0, 1);
        padding: 15px;

        &:last-child {
          border: none;
        }

        span {
          flex: 1;
          margin: 0 10px;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }

    .input {
      display: flex;
      justify-content: space-between;
      padding: 13px 20px;
      margin-bottom: 14px;
      border-radius: 6px;
      background-color: #281a00;

      input {
        flex: 1;
        width: 0;
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 16px;
        color: #ffffff;
      }

      button {
        background: linear-gradient(
          137deg,
          rgba(246, 180, 109, 1) 0%,
          rgba(236, 128, 24, 1) 100%
        );
        font-size: 13px;
        box-shadow: 0px 5px 5px rgba(185, 93, 3, 0.3);
        opacity: 1;
        border-radius: 18px;
        color: #ffffff;
        margin-left: 20px;
        padding: 5px 20px;
      }

      span {
        color: #e6cb76;
        font-size: 16px;
      }
    }

    .remark {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 300;
    }
  }

  .save_login {
    width: 100%;
    color: #705827;
    font-size: 17px;
    padding: 11px 0;
    background: linear-gradient(
      137deg,
      rgba(233, 215, 177, 1) 0%,
      rgba(200, 168, 113, 1) 100%
    );
    opacity: 1;
    border-radius: 6px;
    margin-top: 50px;
  }
}
</style>