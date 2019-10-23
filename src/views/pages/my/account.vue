<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.账号安全')}}</span>
    </div>
    <div class="nav_box"
         v-if="!is_tell">
      <router-link to='tell'
                   class="nav_list">
        <p>{{$t('my.手机号')}}</p>
        <p style="justify-content: flex-end;padding:2px;" v-if="userInfo.mobile ==''">
          <span></span>
          {{$t('my.暂未绑定手机')}}</p>
        <img src="@/assets/img/more_small.png"
             alt="">
      </router-link>
    </div>
    <div class="nav_box"
         v-if="is_tell">
      <div class="nav_list">
        <p>{{$t('my.手机号')}}</p>
        <p style="justify-content: flex-end;padding:10px;">1111111111</p>
      </div>
    </div>
    <div class="nav_box">
      <router-link to='password'
                   class="nav_list">
        <p>{{$t('my.修改登录密码')}}</p>
        <img src="@/assets/img/more_small.png"
             alt="">
      </router-link>
      <router-link to='paypass'
                   class="nav_list">
        <p>{{$t('my.修改二级密码')}}</p>
        <img src="@/assets/img/more_small.png"
             alt="">
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
        return {
            userInfo:{
                account: "",
                avatar: "",
                icon: "",
                id: 0,
                level: "",
                mobile: "*",
                nickname: ""
            }
        };
    },
    mounted() {
        this.user();
    },
    methods: {
        // 用户基本信息
        user(){
            this.$post({
                module: "User",
                interface: 1000,
                success: res => {
                    console.log("用户基本信息", res);
                    if (res.data.code == 0) {
                        this.userInfo = res.data.data;
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
  .nav_box {
    padding-top: 20px;
    .nav_list {
      display: inline-block;
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      align-items: center;
      background: #161102;
      color: #fff;
      img {
        width: 25px;
        height: 25px;
      }
      p {
        flex: 1;
        padding: 0 10px;
        text-align: left;
        color: #ffffff;
        font-size: 14px;
        display: flex;
        align-items: center;
        span {
          margin-right: 5px;
          display: inline-block;
          width: 4px;
          height: 4px;
          background: red;
          border-radius: 50%;
        }
      }
    }
  }
</style>
