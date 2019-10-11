<template>
  <div class="login">
    <div class="nav"></div>

    <div class="title">{{$t('login.登录')}}</div>

    <div class="input_box">
      <div class="item">
        <img src="@/assets/img/youxiang.png" />
        <input type="email" :placeholder="$t('login.请输入邮箱')" />
      </div>

      <div class="item">
        <img src="@/assets/img/mima.png" />
        <input type="password" :placeholder="$t('login.请输入密码')" />
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
  methods: {
    loginFun() {
      this.$router.push("/");
    }
  },
  mounted() {
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
  height: 46px;
  background-color: #0c0c0c;
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