<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.关于我们')}}</span>
    </div>
    <div class="logo_box">
      <img src="@/assets/img/logo@2x.png"
           alt="">
      <p>{{$t('my.莱文资本')}}</p>
    </div>
    <div class="content" v-html="info">
      <!-- <p>用户注册协议</p>
      　未经本站的授权或许可，任何会员不得借用本站的名义从事任何商业活动，也不得将本站作为从事商业活动的场所、平台或其他任何形式的媒介。
      禁止将本站用作从事各种非法活动的场所、平台或者其他任何形式的媒介。违反者若触犯法律，一切后果自负，本站不承担任何责任。 -->
    </div>
    <!-- <div class="botn_box">copyright</div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      info:{}
    }
  },
  mounted() {
      this.getData();
  },
  methods: {
    getData(){
      this.$post({
          module: "Content",
          interface: 4003,
          data: {
              name: 'about_us'
          },
          success: res => {
              
              if (res.data.code == 0) {
                  this.info=  res.data.data.content
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
    .header_img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      margin-right: 8px;
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
.logo_box {
  width: 100%;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    margin-top: 10px;
  }
}
.content {
  width: 100%;
  padding: 30px 15px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  color: #d8d8d8;
  font-size: 16px;
  p {
    color: #fff;
    font-size: 18px;
  }
}
.botn_box {
  width: 100%;
  position: absolute;
  bottom: 20px;
  left: 0;
  color: #d8d8d8;
  font-size: 16px;
  text-align: center;
}
</style>
