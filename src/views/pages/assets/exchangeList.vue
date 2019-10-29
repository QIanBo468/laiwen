<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.兑换记录')}}</span>
    </div>

    <translate position="top">
      <div class="item"  v-for="items in list" key="it">
        <div class="txt">
          <span>{{items.creditName}} {{$t('assets.兑换')}} LEVIN</span>
          <span>{{items.num}}</span>
        </div>
        <div class="time">
          <span>{{items.createdAt}}</span>
          <span>{{$t("assets.实际到账")}}：{{items.actualArrival}}</span>
        </div>
      </div>
    </translate>
    <!-- 加载完毕提示 -->
    <div v-if="isEndShow == 1">
      <p class="jzwb">{{$t('my.已全部加载完毕')}}</p>
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
          module: "Finance",
          interface: 6002,
          data: {
              lastId: that.lastId,
              page: that.page,
              creditType: "credit_13"
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
.item {
  background-color: #281a00;
  margin-top: 10px;
  padding: 11px 26px;

  .txt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      &:first-child {
        color: #fff;
        font-size: 14px;
      }

      &:last-child {
        color: #fff;
        font-size: 16px;
      }
    }
  }

  .time {
    @extend .txt;
    span {
      &:first-child {
        color: #d8c2a1;
        font-size: 11px;
      }

      &:last-child {
        color: #d8c2a1;
        font-size: 11px;
      }
    }
  }
}
.jzwb{
  text-align:center;
  color:#ccc;
}
</style>