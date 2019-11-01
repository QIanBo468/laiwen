<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.充币')}}</span>
    </div>

    <div class="card">
      <div class="title">{{$t('assets.我的钱包地址')}}</div>
      <div class="card_content">{{address}}</div>
      <button  v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('assets.复制')}}</button>
      <div class="code_img">
        <img :src="src" alt />
      </div>
      <!-- <div class="remark">{{$t('assets.长按二维码识别')}}</div> -->
    </div>

    <div class="money_type">
      <i></i>
      <span>{{$t('assets.充币说明')}}</span>
    </div>

    <div class="content" v-html="info">
      
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      address:'',
      info:'',
      src:'',
    }
  },
  mounted() {
    this.getdesc();
    this.getdata();
  },
  methods: {
    getdata(){
      this.$post({
        module: "User",
        interface: 8000,
        success: res => {
            
            if (res.data.code == 0) {
                this.address=  res.data.data.address;
                this.src=  res.data.data.src;
            }
            else{
                this.$toast({
                    duration: 1000,
                    message: res.data.message
                });
            }
        }
      });
    },
    //获取充币说明
    getdesc(){
      this.$post({
        module: "Content",
        interface: 4003,
        data: {
            name: 'charge'
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
    },
    //复制成功
    onCopy() {
        this.$toast({
            duration: 1000,
            message: this.$t('assets.复制成功')
        });
    },
    // 复制失败
    onError(){
      this.$toast({
            duration: 1000,
            message: this.$t('assets.复制失败')
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

.card {
  background: linear-gradient(
    137deg,
    rgba(233, 215, 177, 1) 0%,
    rgba(200, 168, 113, 1) 100%
  );
  border-radius: 6px;
  padding: 25px 20px;
  width: calc(100% - 100px);
  margin: 0 auto;
  margin-top: 10px;
  text-align: center;

  .title {
    color: #705827;
    font-size: 14px;
  }
  .card_content {
    font-size: 16px;
    margin: 17px 0;
    color: #705827;
    word-wrap: break-word;
  }
  button {
    background: linear-gradient(
      137deg,
      rgba(246, 180, 109, 1) 0%,
      rgba(236, 128, 24, 1) 100%
    );
    box-shadow: 0px 5px 5px rgba(185, 93, 3, 0.3);
    opacity: 1;
    border-radius: 18px;
    color: #fff;
    margin: 0 auto 25px;
    padding: 5px 30px;
  }
  .code_img {
    border-top: 1px dashed #705827;
    padding: 17px 0;

    img {
      width: 110px;
    }
  }
  .remark {
    color: #705827;
    font-size: 12px;
  }
}

.money_type {
  padding: 13px 16px;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;

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
.content {
  font-size: 14px;
  color: #fff;
  padding: 0 15px;
  
  /deep/img{
    width: 100%;
    height: auto;
  }
}
</style>
