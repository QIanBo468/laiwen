<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <div>{{$t('assets.兑换')}}</div>
      <router-link tag="span" to="exchangeusdtList">{{$t('assets.兑换记录')}}</router-link>
    </div>

    <div class="card">
      <div class="title">
        <span>USDT</span>
      </div>
      <div class="money">{{money}}</div>
    </div>

    <div class="items">
      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.提币数量')}}</span>
        </div>
        <div class="input">
          <input type="number" v-model="number" :placeholder="$t('assets.请输入兑换数量')"  :change="inp_number()"/>
          <span @click="all_in()">{{$t('assets.全部')}}</span>
        </div>

        <div class="remark">
          <span>{{$t('assets.当前实时价格')}}</span>
          <span>1USDT ≈ {{rate}}LEVIN</span>
        </div>
        <div class="remark">
          <span>{{$t('assets.实际到账')}}</span>
          <span>{{daozhang}}</span>
        </div>
      </div>

      <button class="save_login" @click="sub_exchange()">{{$t('assets.兑换')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: 0,
      number: "",
      rate:0,
      daozhang:0,
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      // 获取个人信息 确定是否绑定手机号
      this.$post({
        module: "Finance",
        interface: 6000,
        success: res => {
          this.rate = res.data.data.usdtTransLaiwen
          this.money = res.data.data.USDT
        }
      });
    },
    inp_number(){
      this.daozhang = (this.number * this.rate).toFixed(2);
    },
    all_in(){
      this.number = this.money
      this.inp_number();
    },
    sub_exchange(){
      if(this.number=='' || this.number<=0){
        this.$toast({
          duration: 1000,
          message: this.$t('assets.请输入兑换数量')
        });
        return ;
      }
      // 获取个人信息 确定是否绑定手机号
      this.$post({
        module: "Finance",
        interface: 6001,
        data:{
          amount:this.number,
          creditType:'credit_14',
        },
        success: res => {
          if(res.data.code == 0){
            this.$toast({
              duration: 1000,
              message: this.$t('assets.兑换成功')
            });
            this.getData();
            this.number = ''
            this.daozhang = 0
          }
          else{
            this.$toast({
              duration: 1000,
              message: res.data.message
            });
            return ;
          }
        }
      });
    }
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

  img {
    width: 24px;
    height: 24px;
    margin: 0 60px;
    margin-left: 11px;
  }

  div {
    color: #ffffff;
    font-size: 18px;
    flex: 1;
    text-align: center;
  }

  span {
    font-size: 14px;
    color: #ffffff;
    padding: 0 14px;
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
      a > img,
      img {
        width: 24px;
        height: 24px;
      }
    }

    .remark {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 13px;
      color: rgba(255, 255, 255, 1);
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
    margin-top: 150px;
  }
}
</style>