<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.添加收款方式')}}</span>
    </div>
    <div class="box">
      <div class="nav_box"
           v-if="is_type==1">
        <span></span>
        <p>{{$t('my.银行')}}({{$t('my.新增收款方式将会进行重新审核!')}})</p>
      </div>
      <div class="inp_box"
           v-if="is_type==1">
        <input type="text"
               :placeholder="$t('my.请输入银行')"
               v-model="blank">
      </div>
      <div class="nav_box"
           v-if="is_type==1">
        <span></span>
        <p>{{$t('my.账户名称')}}</p>
      </div>
      <div class="inp_box"
           v-if="is_type==1">
        <input type="text"
               :placeholder="$t('my.输入账户名称')"
               v-model="name">
      </div>
      <div class="nav_box"
           v-if="is_type==1">
        <span></span>
        <p>{{$t('my.账号')}}</p>
      </div>
      <div class="inp_box"
           v-if="is_type==1">
        <input type="text"
               :placeholder="$t('my.输入账号')"
               v-model="code">
      </div>
      <div class="nav_box"
           v-if="is_type==2">
        <span></span>
        <p>{{$t('my.微信/支付宝名称')}}</p>
      </div>
      <div class="inp_box"
           v-if="is_type==2">
        <input type="text"
               :placeholder="$t('my.输入账户名称')"
               v-model="code">
      </div>
      <div class="nav_box"
           v-if="is_type==2">
        <span></span>
        <p>{{$t('my.微信/支付宝账号')}}</p>
      </div>
      <div class="inp_box"
           v-if="is_type==2">
        <input type="text"
               :placeholder="$t('my.请输入对应的账号')"
               v-model="code">
      </div>
      <div class="nav_box"
           v-if="is_type==2">
        <span></span>
        <p>{{$t('my.上传收款码')}}</p>
      </div>
      <div class="img_nav_box"
           v-if="is_type==2">
        <label for="inp">
          <img src="@/assets/img/tianjia.png"
               alt="">
          <input type="file"
                 id="inp">
        </label>
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
      blank: '',
      name: '',
      code: '',
      is_type: this.$route.query.type,//1 银行卡 2 微信支付宝
    }
  },
  methods: {
    changeFiles () { },
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
    padding: 20px 0;
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
    input::-webkit-input-placeholder {
      color: #ffffff;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  .img_nav_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
      }
      input {
        display: none;
        width: 100px;
        height: 100px;
      }
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
