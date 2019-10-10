<template>
  <div class="forgetPwd">
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('login.忘记密码')}}</span>
    </div>

    <div class="items">
      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('login.邮箱验证')}}</span>
        </div>
        <div class="input">
          <input type="email" :placeholder="$t('login.请输入邮箱')" />
        </div>

        <div class="input">
          <input type="text" :placeholder="$t('login.请输入验证码')" />
          <button>{{$t('login.获取验证码')}}</button>
        </div>
      </div>
      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('login.新密码')}}</span>
        </div>
        <div class="input">
          <input type="password" :placeholder="$t('login.请输入新密码')" />
        </div>

        <div class="input">
          <input type="password" :placeholder="$t('login.请再次输入新密码')" />
        </div>
      </div>

      <button class="save_login">{{$t('login.保存并登录')}}</button>
    </div>
  </div>
</template>
<script>
export default {};
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
        padding: 2px 15px;
      }
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