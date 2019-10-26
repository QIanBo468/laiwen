<template>
  <div>
    <div class="nav">
      <span style="text-align: left;"><img src="@/assets/img/back.png"
             @click="$router.go(-1)" /></span>
      <p>{{$t('my.我的复投')}}</p>
      <span style="text-align: right;color:#FFF7DE"
            @click="nav_link">{{$t('my.投资记录')}}</span>
    </div>
    <div class="box">
      <div class="nav_box">
        <span></span>
        <p>{{$t('my.金额')}}</p>
      </div>
      <div class="inp_box">
        <p>￥</p>
        <input type="text"
               :placeholder="basenumtxt"
               v-model="name">
        <img src="@/assets/img/guanbi.png"
             alt=""
             v-if="name!=''"
             @click="name=''">
      </div>
      <div class="btn_outer">
        <button class="btn" @click="sub()" >{{$t('index.提交')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      basenum: 0,
      basenumtxt: '',
    }
  },
  mounted() {
      this.init();
  },

  methods: {
    nav_link () {
      this.$router.push({path:'/investmentRecord'})
    },
    init(){
      this.$post({
          module: "Investment",
          interface: 3001,
          success: res => {
              this.basenum = res.data.data.base_num
              this.basenumtxt = this.$t('my.请输入')+ res.data.data.base_num+ this.$t('my.的倍数')
          }
      });
    },
    sub(){
      if(this.name == '' || this.name == 0){
        this.$toast({
            duration: 1000,
            message: this.basenumtxt
        });
        return ;
      }
      console.log()
      if(this.name%100 >0){
        this.$toast({
            duration: 1000,
            message: this.basenumtxt
        });
        return ;
      }
      this.$post({
          module: "Investment",
          interface: 3000,
          data:{
            id:1,
            amount:this.name,
            type:1
          },
          success: res => {
            this.$toast({
                duration: 1000,
                message: res.data.message
            });
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
  padding: 0 15px;
  span {
    display: inline-block;
    width: 20%;
    color: #ffffff;
    font-size: 18px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  p {
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
    p {
      font-size: 16px;
      color: #ffffff;
      margin-right: 10px;
    }
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
