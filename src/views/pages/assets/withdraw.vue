<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="retur" />
            <span>{{$t('assets.提现')}}</span>
        </div>

        <div class="card">
            <div class="title">
                <span>{{$t('assets.莱文币')}}</span>
            </div>
            <div class="money">{{number}}</div>
        </div>

        <div class="items">
            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('assets.提现至')}}</span>
                </div>
                <div class="drop_down">
                    <van-radio-group v-model="radio" checked-color="#C8A871">
                        <div class="drop_item" v-if="zfb != ''">
                            <img src="@/assets/img/zfb.png" alt />
                            <span>{{$t('assets.支付宝')}}</span>
                            <van-radio :name="zfb.id"></van-radio>
                        </div>
                        <div class="drop_item" v-if="wx != ''">
                            <img src="@/assets/img/wx.png" alt />
                            <span>{{$t('assets.微信')}}</span>
                            <van-radio :name="wx.id"></van-radio>
                        </div>
                        <router-link to="myBankCard" tag="div" class="drop_item" v-if="list.length != 0">
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
                    <input type="number" :placeholder="$t('assets.请输入提现金额')" v-model="money"/>
                    <span @click="money = number">{{$t('assets.全部')}}</span>
                </div>

                <div class="remark">
                    <span>{{$t('assets.手续费')}}</span>
                    <span>{{service_charge}}</span>
                </div>
                <div class="remark">
                    <span>{{$t('assets.实际到账')}}</span>
                    <span>{{arrival}}</span>
                </div>
            </div>

            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('assets.二级密码')}}</span>
                </div>
                <div class="input">
                    <input type="password" :placeholder="$t('assets.请输入二级密码')" v-model="password" />
                </div>
            </div>

            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('assets.安全验证')}}（{{mobile | mobiles}}）</span>
                </div>
                <div class="input">
                    <input type="text" :placeholder="$t('login.请输入验证码')" v-model="code"/>
                    <button @click="verification">{{show == true?$t('assets.获取'):time+'S'}}</button>
                </div>
            </div>

            <button class="save_login" @click="withdraw">{{$t('assets.提现')}}</button>
        </div>
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
            isShow:false,
            radio: "", //选择支付方式
            number: "", //数量
            mobile: "", //手机号
            password: "", //密码
            money: "", //金额
            code: "", //验证码
            service_charge: "",//手续费
            list:[],//银行卡列表
            arrival:0,//实际金额
            wx:'',//微信
            zfb:'',//支付宝
            time:60,//验证码 时间
            show: true, //获取验证码是否显示
        };
    },
    watch: {
      money(val){//计算金额
        this.arrival = this.money * (this.service_charge/100);
        this.arrival = this.money - this.arrival.toFixed(2);
      },
      radio(val){//选择提现方式
        sessionStorage.setItem("radio", this.radio);
      }
    },
    filters:{//手机号码处理
        mobiles(value){
          let start = value.slice(0, 3)
          let end = value.slice(-4)
          return `${start}****${end}`
        }
    },
    mounted() {
        this.radio = Number(sessionStorage.getItem("radio"));
        //获取提现参数
        this.$post({
            module: "Finance",
            interface: 4003,
            success: res => {
                console.log("提现参数", res);
                if (res.data.code == 0) {
                    this.number = res.data.data.credit_1;
                    this.mobile = res.data.data.mobile;
                    this.service_charge = res.data.data.service_charge;
                    this.wx = res.data.data.WeChat;
                    this.zfb = res.data.data.Alipay;
                    this.list = res.data.data.Bank;
                    
                    if(res.data.data.mobile == null || res.data.data.mobile == undefined || res.data.data.mobile == ''){
                      this.isShow = true;
                   }
                }
            }
        });
    },
    methods: {
      //返回
      retur(){
        sessionStorage.clear();
        this.$router.go(-1);
      },
      //验证码
      verification(){
        if(this.mobile == null || this.mobile == undefined || this.mobile == ''){
          this.isShow = true;
          return
        }
        if (!this.show) {
          return;
        }
        this.$post({
                module: "Account",
                interface: 1005,
                data: {
                    account: this.mobile
                },
                success: res => {
                    console.log("获取密码验证码", res);
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                    if (res.data.code == 0) {
                        this.show = false;
                        let time = setInterval(() => {
                            this.time--;
                            if (this.time == 0) {
                                clearInterval(time);
                                this.time = 60;
                                this.show = true;
                            }
                        }, 1000);
                    }
                }
            });
      },
      //提现
      withdraw(){
        if(this.money == ''){
          this.$toast({
            duration: 1000,
            message: this.$t('assets.请输入提现金额')
          });
          return
        }
        if(this.password == ''){
          this.$toast({
            duration: 1000,
            message: this.$t('assets.请输入二级密码')
          });
          return
        }
        if(this.code == ''){
          this.$toast({
            duration: 1000,
            message: this.$t('login.请输入验证码')
          });
          return
        }
        if(this.radio == ''){
          this.$toast({
            duration: 1000,
            message: this.$t('assets.请选择提现方式')
          });
          return
        }
        let data = {name:'',account:''};
        if(this.radio == this.wx.id){
          data.name = 20;
          data.account = this.wx.id
        }else if(this.radio == this.zfb.id){
          data.name = 10;
          data.account = this.zfb.id
        }else{
          data.name = 30;
          data.account = Number(sessionStorage.getItem("card"));
        }
         this.$post({
            module: "Finance",
            interface: 4001,
            data:{
              creditType:'credit_1',
              accountType:data.name,
              account:data.account,
              amount:this.money,
              safeword:this.password,
              code:this.code,
            },
            success: res => {
                console.log("提现", res);
                this.$toast({
                      duration: 1000,
                      message: res.data.message
                    });
                if (res.data.code == 0) {
                   this.retur();
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