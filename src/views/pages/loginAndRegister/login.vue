<template>
  <div class="login" v-if="show">
    <div class="nav">
      <van-switch
        v-model="checked"
        size="20px"
        active-color="#D5AB64"
        inactive-color="#0C0C0C"
        @change="localchange"
      />
       <img width="28px;" height="20px;" :src="languages" alt="">
      <!-- <p>{{localStorage}}</p> -->
    </div>
    <div class="title">{{$t('login.登录')}}</div>
    <div class="input_box">
      <div class="item">
        <img src="@/assets/img/youxiang.png" />
        <input type="email" :placeholder="$t('login.请输入邮箱')" v-model="account" />
      </div>

      <div class="item">
        <img src="@/assets/img/mima.png" />
        <input type="password" :placeholder="$t('login.请输入密码')" v-model="password" />
      </div>
    </div>

    <div class="forget_pwd">
      <router-link class="animate" to="forgetPwd">{{$t('login.忘记密码')}}？</router-link>
    </div>

    <button @click="loginFun" class="login_btn">{{$t('login.登录')}}</button>

    <router-link tag="div" class="animate register_btn" to="register">{{$t("login.立即注册")}}</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "", //账号
      password: "", //密码
      localStorage: "En",
      lang: "",
      show: true,
      languages:require('../../../assets/img/US@3x.png')
    };
  },
  computed: {
    checked() {
      if (localStorage.getItem("lang") == "en") {
        this.lang = 0;
        return true;
      } else {
        this.lang = 1;
        return false;
      }
    }
  },
  methods: {
    localchange() {
      if (this.checked) localStorage.setItem("lang", "zh");
      else localStorage.setItem("lang", "en");

      window.location.reload();
    },
    loginFun() {
      if (this.account == "") {
        this.$toast({
          duration: 1000,
          message: this.$t("login.请输入邮箱")
        });
        return;
      }
      if (this.password == "") {
        this.$toast({
          duration: 1000,
          message: this.$t("login.请输入密码")
        });
        return;
      }
      this.$post({
        module: "Account",
        interface: 1000,
        data: {
          account: this.account,
          password: this.password,
          language: this.lang
        },
        success: res => {
          console.log("登录成功", res);
          if (res.data.code == 0) {
            localStorage.setItem("Bearer", res.data.data.accessToken);
            console.log(localStorage.getItem("Bearer"));
            this.$toast({
              duration: 1000,
              message: this.$t("login.登录成功")
            });
            this.$router.replace("/");
          } else {
            this.$toast({
              duration: 1000,
              message: res.data.message
            });
          }
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("lang") == "zh") {
      this.localStorage = "中";
      this.languages = require("../../../assets/img/CHN@3x.png");
    
    } else {
        this.localStorage = "En";
      this.languages = require("../../../assets/img/US@3x.png");
    }

    let item = document.querySelectorAll(".animate"),
      _this = this;

    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener("touchstart", e => {
        _this.$_clickAnimate(
          item[i],
          e.touches[0].clientX,
          e.touches[0].clientY,
          "rgba(74, 51, 0, 0.2)"
        );
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 15px;
  background-color: #0c0c0c;
  p {
    font-size: 14px;
    color: #ffffff;
    margin-left: 10px;
  }
  /deep/.van-switch {
    border: 1px solid #d5ab64;
  }
}

.title {
  padding: 10px 30px;
  font-size: 24px;
  color: #ffffff;
}

.input_box {
  margin-top: 50px;

  .item {
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;

    img {
      width: 20px;
      height: 20px;
      margin: 0 20px;
    }

    input {
      border: none;
      outline: none;
      color: #fff7de;
      background-color: transparent;
      border-bottom: 1px solid #4a3300;
      flex: 1;
      padding: 14px 0;
    }
  }
}

.forget_pwd {
  display: flex;
  justify-content: flex-end;
  padding: 15px 13px;
  a {
    font-size: 12px;
  }
}

.login_btn {
  width: calc(100% - 60px);
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
  margin: 0 30px;
  margin-top: 120px;
}

.animate {
  position: relative;
  padding: 0 5px;
  color: #fff;
}
.register_btn {
  font-size: 14px;
  margin: 17px auto;
  width: fit-content;
}
</style>