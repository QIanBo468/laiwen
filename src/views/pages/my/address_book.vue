<template>
  <div>
    <div class="nav">
      <span style="text-align: left;"><img src="@/assets/img/back.png"
             @click="$router.go(-1)" /></span>
      <p>{{$t('my.地址簿')}}</p>
      <span style="text-align: right;"
            @click="nav_link">{{$t('my.添加')}}</span>
    </div>
    <van-swipe-cell  class="item"  v-for="item in list">
      <!-- <img src="@/assets/img/code.png"
           alt=""> -->
      <div class="coll">
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
      </div>
      <template slot="right">
        <van-button square
                    type="danger"
                    :text="$t('my.立即删除')" @click="del(item.id)"/>
      </template>
    </van-swipe-cell>
    <!-- 加载完毕提示 -->
    <van-swipe-cell v-if="isEndShow == 1">
      <p class="jzwb">{{$t('my.已全部加载完毕')}}</p>
    </van-swipe-cell>

    <div v-if="is_show" class="back_add">
      <div class="box">
        <p>{{$t('my.删除地址')}}</p>
        <p>{{$t('my.确认删除此地址')}}</p>
        <button class="btn"
                @click="add_unset">{{$t('my.确定')}}</button>
        <p style="color:#FFF7DE;padding-top:10px;"
           @click="is_show=false;">{{$t('my.取消')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      is_show: false,
      list:[],
      lastId:0,
      page:1,
      isEnd:0,
      isEndShow:0,
      id:0,
    }
  },
  mounted() {
      this.getlist();
      window.addEventListener('scroll', this.scrollEvent,false);
  },
  methods: {
    //获取列表
    getlist(){
      var that = this;
      this.$post({
          module: "UserAddress",
          interface: 1000,
          data: {
              lastId: that.lastId,
              page: that.page
          },
          success: res => {
              
              if (res.data.code == 0) {
                  if(res.data.data.list.length == 0){
                    that.isEnd = 1;
                    that.isEndShow = 1;
                    return ;
                  }
                  that.list = that.list.concat(res.data.data.list)
                  that.lastId = res.data.data.lastId
              }
              else{
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
              }
          },
          complete: res=>{
              //返回接果处理的
              // that.sendStatus = 0;
          }
      });
    },
    scrollEvent(){
      if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight) {
        if(this.isEnd == 0){
          console.log('加载下一页',this.isEnd,this.page)
          this.page =  parseInt(this.page)+1
          this.getlist()
        }
      }
    },
    nav_link () {
      this.$router.push({ name: 'addres' })
    },
    // onClose (clickPosition, instance) {
    //   console.log('删除滑动',clickPosition, instance);
    //   switch (clickPosition) {
    //     case 'left':
    //     case 'cell':
    //     case 'outside':
    //       instance.close();
    //       break;
    //     case 'right':
    //       this.is_show = true;
    //       break;
    //   }
    // },
    del(id){
      this.id=id;
      this.is_show = true;
    },
    add_unset () {
      var that = this;
      this.$post({
          module: "UserAddress",
          interface: 1002,
          data: {
              id: that.id
          },
          success: res => {
              this.is_show = false;
              if (res.data.code == 0) {
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
                  this.page = 1;
                  this.lastId = 0;
                  this.list = [];
                  this.isEnd = 0;
                  this.isEndShow=0;
                  this.id=0;
                  this.getlist();
              }
              else{
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
              }
          },
          complete: res=>{
              //返回接果处理的
              // that.sendStatus = 0;
          }
      });
    },
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
.item {
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  /deep/ .van-swipe-cell__wrapper {
    display: flex;
    padding: 15px;
    background: #281a00;
  }
  .coll {
    background: none;
    padding-left: 20px;
    color: #ffffff;
    font-size: 16px;
  }
  /deep/ .van-button {
    height: 100%;
  }
}
.back_add {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .box {
    width: 80%;
    padding: 20px;
    background: linear-gradient(
      137deg,
      rgba(233, 215, 177, 1) 0%,
      rgba(200, 168, 113, 1) 100%
    );
    border-radius: 6px;
    > p {
      width: 100%;
      padding: 5px 0;
      text-align: center;
      font-size: 18px;
      color: #705827;
    }
    .btn {
      margin-top: 20px;
      width: 100%;
      padding: 10px 0;
      background: rgba(255, 247, 222, 1);
      border-radius: 20px;
    }
  }
}
.jzwb{
  text-align:center;
  color:#ccc;
}
</style>