<template>
  <div class="register">
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
    </div>

    <div class="title">{{$t('login.注册')}}</div>
    <div class="go_login">
      {{$t('login.返回登录')}}
      <router-link to="login" class="animate">{{$t('login.登录')}}</router-link>
    </div>

    <div class="input_box">
      <div class="item">
        <img src="@/assets/img/youxiang.png" />
        <input type="email" :placeholder="$t('login.请输入邮箱')" />
      </div>

      <div class="item">
        <img src="@/assets/img/jihuoma.png" />
        <div class="code">
          <input type="text" :placeholder="$t('login.请输入验证码')" />
          <button>{{$t('login.获取验证码')}}</button>
        </div>
      </div>

      <div class="item">
        <img src="@/assets/img/mima.png" />
        <input type="password" :placeholder="$t('login.请输入密码')" />
      </div>

      <div class="item">
        <img src="@/assets/img/mima.png" />
        <input type="password" :placeholder="$t('login.二次输入密码')" />
      </div>

      <div class="item">
        <img src="@/assets/img/mima.png" />
        <input type="password" :placeholder="$t('login.请设置二级密码')" />
      </div>

      <div class="item">
        <img src="@/assets/img/mima.png" />
        <input type="password" :placeholder="$t('login.确认二级密码')" />
      </div>

      <div class="item">
        <img src="@/assets/img/youxiang.png" />
        <input type="email" :placeholder="$t('login.请输入推荐人邮箱')" />
      </div>

      <div class="item">
        <img src="@/assets/img/youxiang.png" />
        <input type="email" :placeholder="$t('login.请输入安置人邮箱')" />
      </div>
    </div>

    <button class="register_btn">{{$t('login.注册')}}</button>

    <div class="protocol">
      <van-checkbox v-model="checked" checked-color="#C8A871"></van-checkbox>
      <span>{{$t('login.协议')}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true
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

  img {
    width: 24px;
    height: 24px;
    margin-left: 11px;
  }
}

.title {
  padding: 10px 30px;
  font-size: 24px;
  color: #ffffff;
}

.go_login {
  padding: 0px 30px;
  font-size: 14px;
  color: #ffffff;

  .animate {
    color: #ec8018;
  }
}

.input_box {
  margin-top: 30px;

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

    & > input {
      border: none;
      width: 0;
      outline: none;
      color: #fff7de;
      background-color: transparent;
      border-bottom: 1px solid #4a3300;
      flex: 1;
      padding: 14px 0;
    }

    .code {
      display: flex;
      flex: 1;
      align-items: center;
      border-bottom: 1px solid #4a3300;

      input {
        flex: 1;
        width: 0;
        border: none;
        outline: none;
        color: #fff7de;
        background-color: transparent;
        padding: 14px 0;
      }

      button {
        white-space: nowrap;
        margin-left: 20px;
        color: #ffffff;
        border-radius: 50px;
        border: 1px solid #ffffff;
        height: fit-content;
        padding: 2px 15px;
      }
    }
  }
}

.register_btn {
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
  margin-top: 50px;
}

.protocol {
  display: flex;
  padding: 13px 0;
  justify-content: center;

  span {
    margin-left: 10px;
  }
}
</style>