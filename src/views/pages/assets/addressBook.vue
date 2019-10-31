<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <div>{{$t('assets.地址簿')}}</div>
      <span @click="com_addr()">{{$t('public.确定')}}</span>
    </div>

    <translate position="top" v-if="list.length > 0">
      <van-radio-group v-model="index" checked-color="#C8A871" >
        <div class="item" v-for="(item,index) in list">
          <!-- <img src="@/assets/img/gonggao_more.png" alt /> -->
          <div class="text">
            <div>{{item.name}}</div>
            <div>{{item.address}}</div>
          </div>
          <van-radio :name="index"></van-radio>
        </div>
      </van-radio-group>
    </translate>
    <!-- 空数据的时候 -->
    <translate position="top" v-else>
      <div class="tip">{{$t('my.您的地址簿为空,快去添加吧')}}</div>
    </translate>
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
      index:0,
      type:'eth',
    }
  },
  mounted() {
      this.getlist();
      window.addEventListener('scroll', this.scrollEvent,false);
      var type = this.$route.query.type
      if(type == 'usdt'){
        this.type = 'usdt';
      }
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
    com_addr(){
      if(this.index < 0){
        this.$toast({
            duration: 1000,
            message: this.$t('my.您的地址簿为空,快去添加吧')
        });
      }
      var info = this.list[this.index]
      console.log('选中的',info);
      if(this.type == 'eth'){
        this.$router.push({ path: '/getCoin', query: {address: info.address} })
      }
      else{
        this.$router.push({ path: '/getCoinUsdt', query: {address: info.address} })
      }
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

  img {
    width: 24px;
    height: 24px;
    margin: 0 60px;
    margin-left: 11px;
  }

  div {
    color: #ffffff;
    font-size: 18px;
    flex: 1;
    text-align: center;
  }

  span {
    font-size: 14px;
    color: #ffffff;
    padding: 0 14px;
  }
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #281a00;
  margin-top: 10px;
  padding: 11px 26px;

  .text {
    div {
      &:first-child {
        color: #ffffff;
        font-size: 14px;
      }

      &:last-child {
        color: #c7c7cc;
        font-size: 12px;
      }
    }
  }
  img:first-child {
    width: 33px;
    height: 33px;
    border-radius: 50px;
  }
}
.tip{
  color:#fff;
  text-align:center;
}
</style>