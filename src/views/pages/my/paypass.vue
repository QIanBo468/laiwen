<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.修改登录密码')}}</span>
    </div>
    <div class="box">
      <div class="nav_box">
        <span></span>
        <p>{{$t('my.安全验证')}}(1111111)</p>
      </div>
      <div class="inp_box">
        <input type="text"
               :placeholder="$t('login.验证码')"
               v-model="code">
        <button class="btn">{{$t('assets.获取')}}</button>
      </div>
      <div class="nav_box">
        <span></span>
        <p>{{$t('my.原始密码')}}</p>
      </div>
      <div class="inp_box">
        <input type="text"
               :placeholder="$t('my.请输入原始密码')"
               v-model="pass">
      </div>
      <div class="nav_box">
        <span></span>
        <p>{{$t('login.新密码')}}</p>
      </div>
      <div class="inp_box">
        <input type="text"
               :placeholder="$t('login.请输入新密码')"
               v-model="pass">
      </div>
      <div class="inp_box"
           style="margin-top:20px;">
        <input type="text"
               :placeholder="$t('login.请再次输入新密码')"
               v-model="pass">
      </div>
      <div class="btn_outer">
        <button class="btn">{{$t('my.确定')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tell: '',
      code: '',
      pass: '',
      new_pass: '',
      new_pass_to: ''
    }
  },
  methods: {

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
}
</style>
