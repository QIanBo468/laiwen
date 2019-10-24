<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.修改二级密码')}}</span>
    </div>
    <div class="box">
      <div class="nav_box">
        <span></span>
        <p>{{$t('my.安全验证')}}({{tellShow}})</p>
      </div>
      <div class="inp_box">
        <input type="text"
               :placeholder="$t('login.验证码')"
               v-model="code">
        <button class="btn" @click="getCode()">{{showTitle}}</button>
      </div>
      <div class="nav_box">
        <span></span>
        <p>{{$t('my.原始密码')}}</p>
      </div>
      <div class="inp_box">
        <input type="password"
               :placeholder="$t('my.请输入原始密码')"
               v-model="oldPassword">
      </div>
      <div class="nav_box">
        <span></span>
        <p>{{$t('login.新密码')}}</p>
      </div>
      <div class="inp_box">
        <input type="password"
               :placeholder="$t('login.请输入新密码')"
               v-model="password" @input="passInp()">
      </div>
      <div class="inp_box"
           style="margin-top:20px;">
        <input type="password"
               :placeholder="$t('login.请再次输入新密码')"
               v-model="new_pass" @input="passInp()">
        <p class="showtip">{{oldPasswordText}}</p>
      </div>
      <div class="btn_outer">
        <button class="btn"  @click="sub_charge()">{{$t('my.确定')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tellShow: '',
      tell: '',
      code: '',
      oldPassword: '',
      password: '',
      new_pass: '',
      showTitle:'',
      sendStatus: 0,
      timeout:60,
      oldPasswordText:''
    }
  },
  mounted() {
      this.showMobile();
  },
  methods: {
    showMobile(){
      this.showTitle = this.$t('assets.获取');
      var mobile = this.$route.query.mobile
      if(!(/^1[3456789]\d{9}$/.test(mobile))){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.为保护您的账户安全,请先绑定手机号')
        });
        this.$router.replace("/account");
        return ;
      }
      this.tell = mobile;
      this.tellShow = mobile.substr(0, 3) + '****' + mobile.substr(7);
    },
    passInp(){
      if(this.password!='' && this.new_pass!=''){

        if(this.password != this.new_pass){
          this.oldPasswordText = this.$t('login.两次密码不同');
        }
        else{
          this.oldPasswordText = ''
        }
      }
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
      if(!(/^1[3456789]\d{9}$/.test(this.tell))){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.手机号码错误')
        });
        return ;
      }
      //设置为已发放
      this.sendStatus = 1
      this.$post({
          module: "User",
          interface: 6001,
          data: {
              mobile: that.tell
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
          },
          complete: res=>{
              //返回接果处理的
              // that.sendStatus = 0;
          }
      });
    },
    //更新手机号绑定
    sub_charge(){
      var that = this;
      if(this.code == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('assets.验证码错误')
        });
        return ;
      }
      if(this.oldPassword == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('login.请输入旧密码')
        });
        return ;
      }
      if(this.password == ''){
        this.$toast({
            duration: 1000,
            message: this.$t('login.请输入新密码')
        });
        return ;
      }
      if(this.password != this.new_pass){
        this.$toast({
            duration: 1000,
            message: this.$t('login.两次密码不同')
        });
        return ;
      }
      this.$post({
        module: "User",
        interface: 2001,
        data: {
            captcha: that.code,
            oldPassword: that.oldPassword,
            password: that.password,
        },
        success: res => {
            
            if (res.data.code == 0) {
                this.$toast({
                    duration: 1000,
                    message: res.data.message
                });
                this.$router.replace("/mine");
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
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .nav_box {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px 0;
      span {
        display: inline-block;
        width: 6px;
        height: 15px;
        background: linear-gradient(
          180deg,
          rgba(255, 147, 12, 1) 0%,
          rgba(255, 80, 0, 1) 100%
        );
        border-radius: 5px;
      }
      p {
        padding-left: 15px;
        flex: 1;
        color: #ffffff;
        font-size: 16px;
      }
    }
    .inp_box {
      width: 100%;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(40, 26, 0, 1);
      opacity: 1;
      border-radius: 6px;
      input {
        flex: 1;
        padding: 0 10px 0 0;
        border: none;
        background: none;
        color: #ffffff;
        font-size: 16px;
      }
      .btn {
        padding: 5px 10px;
        color: #ffffff;
        font-size: 16px;
        background: linear-gradient(
          137deg,
          rgba(246, 180, 109, 1) 0%,
          rgba(236, 128, 24, 1) 100%
        );
        box-shadow: 0px 5px 5px rgba(185, 93, 3, 0.3);
        opacity: 1;
        border-radius: 18px;
      }
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
    .btn_outer {
      padding: 15px;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      .btn {
        box-sizing: border-box;

        background: linear-gradient(
          137deg,
          rgba(233, 215, 177, 1) 0%,
          rgba(200, 168, 113, 1) 100%
        );
        border-radius: 6px;
        color: #705827;
        padding: 10px 0;
        width: 100%;
      }
    }
    .showtip{
      color:red;
    }
  }
</style>
