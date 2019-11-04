<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <div>{{$t('assets.提币')}}</div>
      <router-link tag="span" to="getCoinList">{{$t('assets.提币记录')}}</router-link>
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
          <span>{{$t('assets.钱包地址')}}</span>
        </div>
        <div class="input">
          <input type="text" v-model="address" :placeholder="$t('assets.请输入钱包地址')" />
          <router-link to="addressBook?type=usdt" v-show="!address">
            <img src="@/assets/img/dizhibo.png" alt />
          </router-link>
          <img @click="address = ''" src="@/assets/img/guanbi.png" v-show="address" alt /> 
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.提币数量')}}</span>
        </div>
        <div class="input">
          <input type="number" v-model="number" :placeholder="$t('assets.请输入提币数量')"  :change="inp_number()"/>
          <span @click="all_in()">{{$t('assets.全部')}}</span>
        </div>

        <div class="remark">
          <span>{{$t('assets.手续费')}}</span>
          <span>{{rate}}%</span>
        </div>
        <div class="remark">
          <span>{{$t('assets.实际到账')}}</span>
          <span>{{daozhang}}</span>
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.二级密码')}}</span>
        </div>
        <div class="input">
          <input type="password" v-model="safepass" :placeholder="$t('assets.请输入二级密码')" />
        </div>
      </div>

      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.安全验证')}}（{{mobileShow}}）</span>
        </div>
        <div class="input">
          <input type="text" :placeholder="$t('login.请输入验证码')" v-model="code"/>
          <button @click="getCode()">{{showTitle}}</button>
        </div>
      </div>

      <button class="save_login"  @click="tibi()">{{$t('assets.提币')}}</button>
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
      mobile:'',
      mobileShow:'',
      address:'',
      code:'',
      showTitle:'',
      sendStatus:0,
      timeout:60,
      safepass:''
    };
  },

  mounted() {
    var address = this.$route.query.address;
    if(typeof(address) != 'undefined'){
      this.address  = address;
    }
    this.showTitle = this.$t('assets.获取');

    this.getData();
  },
  methods: {
    getData(){
      // 获取个人信息 确定是否绑定手机号
      this.$post({
        module: "Finance",
        interface: 6000,
        success: res => {
          this.rate = res.data.data.usdtWithdrawMoney
          this.money = res.data.data.USDT
          this.mobile = res.data.data.mobile
          this.mobileShow = res.data.data.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
        }
      });
    },
    inp_number(){
      this.daozhang = (this.number * (100-this.rate)/100).toFixed(4);
    },
    all_in(){
      this.number = this.money
      this.inp_number();
    },

    getCode(){
      var that  = this;
      console.log('发送状态',this.sendStatus)
      if(this.timeout != 60){
        return ;
      }
      if(this.sendStatus == 1){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.您已获取,无须重复点击')
        });
        return ;
      }
      if(!(/^1[3456789]\d{9}$/.test(this.mobile))){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.手机号码错误')
        });
        return ;
      }
      //设置为已发放
      this.sendStatus = 1
      this.$post({
          module: "Account",
          interface: 1005,
          data: {
              account: that.mobile
          },
          success: res => {
              that.sendStatus = 0;
              
              if (res.data.code == 0) {
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
                  var timeoutId = setInterval(function () {
                    if(that.timeout>0){
                      that.showTitle = that.timeout+'S';
                      that.timeout = that.timeout-1;
                    }
                    else{
                      clearInterval(timeoutId);
                      that.timeout = 60;
                      that.showTitle = that.$t('assets.重新获取');
                    }
                  }, 1000);
              }
              else{
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
              }
          }
      });
    },
    //提币操作
    tibi(){
      var that = this;
      if(this.code == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('login.请输入验证码')
        });
        return ;
      }
      if(this.address == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.请输入钱包地址')
        });
        return ;
      }
      if(this.number == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.请输入提币数量')
        });
        return ;
      }
      if(this.safepass == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.请输入二级密码')
        });
        return ;
      }
      //校验手机验证码 
      this.$post({
          module: "Account",
          interface: 1006,
          data: {
            captcha: this.code
          },
          success: res => {
            if (res.data.code == 0) {
              //提币提交
              this.$request({
                module: "Wallet",
                interface: 2001,
                data: {
                  creditType: 'credit_14',
                  contract: '2',
                  address: that.address,
                  amount: that.number,
                  safeword: that.safepass,
                },
                success: res => {
                  if (res.data.code == 0) {
                    //提币提交
                    console.log('111');
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                    this.$router.go(-1);
                  }
                  else{
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                  }
                }
              });
              //---end---
            }
            else{
              this.$toast({
                  duration: 1000,
                  message: res.data.message
              });
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