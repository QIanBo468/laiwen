
<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.莱文币')}}</span>
    </div>

    <div class="card">
      <div class="title">
        <span>{{$t('assets.余额')}}</span>
        <router-link to="FillMoney" tag="div">
          <translate position="flash" class="recharge">{{$t('assets.充值')}}</translate>
        </router-link>
      </div>
      <div class="money">232323</div>
      <div class="option">
        <router-link to="withdraw" tag="div">
          <img src="@/assets/img/tixian_icon.png" />
          <span>{{$t('assets.提现')}}</span>
        </router-link>
        <router-link to="LevinExchange" tag="div">
          <img src="@/assets/img/duihuan_icon.png" />
          <span>{{$t('assets.兑换')}}</span>
        </router-link>
        <router-link to="Transfer" tag="div">
          <img src="@/assets/img/zhuanzhang_icon.png" />
          <span>{{$t('assets.转账')}}</span>
        </router-link>
      </div>
    </div>

    <van-tabs
      v-model="active"
      background="#271B00"
      title-active-color="#fff"
      title-inactive-color="#D8C2A1"
      sticky
      animated
    >
      <van-tab :title="$t('assets.全部')">
        <translate position="top" class="tab_box">
          <div class="item" v-for="item in 14">
            <div class="text">
              <div>静态收益</div>
              <div>2019.06.12 14:12:45</div>
            </div>
            <span>+21323</span>
          </div>
        </translate>
      </van-tab>
      <van-tab :title="$t('assets.收入')">
        <translate position="top" class="tab_box">
          <div class="item" v-for="item in 14">
            <div class="text">
              <div>静态收益</div>
              <div>2019.06.12 14:12:45</div>
            </div>
            <span>+21323</span>
          </div>
        </translate>
      </van-tab>
      <van-tab :title="$t('assets.支出')">
        <translate position="top" class="tab_box">
          <div class="item" v-for="item in 14">
            <div class="text">
              <div>静态收益</div>
              <div>2019.06.12 14:12:45</div>
            </div>
            <span>+21323</span>
          </div>
        </translate>
      </van-tab>
    </van-tabs>

    <van-popup :style="{width: '70%'}" :close-on-click-overlay="false" v-model="isShow">
      <div class="van_body">
        <div class="title">{{$t("assets.绑定手机号")}}</div>
        <div class="content" v-html="$t('assets.为保护您的账户安全,请先绑定手机号')"></div>
        <button class="btn" @click="$router.push('tell')">{{$t('assets.立即绑定')}}</button>
        <div class="recharge" @click="isShow=false">{{$t("public.取消")}}</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      isShow: false
    };
  },

  created() {
    this.isShow = true;
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
    89deg,
    rgba(254, 116, 116, 1) 0%,
    rgba(253, 170, 115, 1) 100%
  );
  border-radius: 6px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 16px 25px;

    > span {
      color: #ffffff;
      font-size: 16px;
    }
    .recharge {
      background-image: url(../../../assets/img/chongbi_bg.png);
      background-size: 100% 100%;
      padding: 3px 17px 7px 33px;
      color: #705827;
      font-size: 14px;
      text-align: center;
      transform: translateX(4px);
    }
  }
  .money {
    font-size: 28px;
    color: #ffffff;
    padding-left: 25px;
    margin-bottom: 16px;
  }

  .option {
    display: flex;
    background-color: #fda07e;
    border-radius: 6px;

    div {
      flex: 1;
      text-align: center;
      padding: 14px 0;
      color: #fff;
      font-size: 12px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
}

/deep/ .van-tabs__line {
  background: linear-gradient(
    137deg,
    rgba(246, 180, 109, 1) 0%,
    rgba(236, 128, 24, 1) 100%
  );
}

.tab_box {
  margin-top: 14px;

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

/deep/ .van-popup {
  background-color: transparent;
}
.van_body {
  background: linear-gradient(
    137deg,
    rgba(233, 215, 177, 1) 0%,
    rgba(200, 168, 113, 1) 100%
  );
  padding: 28px 20px 20px;
  border-radius: 6px;
  text-align: center;

  .title {
    color: #705827;
    font-size: 18px;
    font-weight: bold;
  }
  .content {
    color: #705827;
    font-size: 15px;
    margin-top: 10px;
  }
  .btn {
    color: #705827;
    background-color: #fff7de;
    border-radius: 50px;
    width: 100%;
    font-size: 15px;
    margin-top: 15px;
    padding: 5px 0;
  }
  .recharge {
    color: #fff;
    width: fit-content;
    margin: 0 auto;
    padding: 0 5px;
    margin-top: 15px;
    font-size: 14px;
  }
}
</style>