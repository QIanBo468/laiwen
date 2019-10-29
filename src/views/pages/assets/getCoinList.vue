<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.提币记录')}}</span>
    </div>

    <translate position="top">
      <div class="item" v-for="item in list">
        <div class="title">
          <span>{{item.creditName}}</span>
          <span v-if="item.status == 0">{{$t('assets.审核中')}}</span>
        </div>
        <div class="txt">
          <span>{{item.account}}</span>
          <span>{{item.money}}</span>
        </div>
        <div class="time">
          <span>{{item.createdAt}}</span>
          <span>{{$t('assets.手续费')}}：{{item.fee}}</span>
        </div>
      </div>
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
      this.$request({
          module: "Wallet",
          interface: 2002,
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

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      &:first-child {
        color: #d8c2a1;
        font-size: 14px;
      }

      &:last-child {
        color: #ec8018;
        font-size: 14px;
      }
    }
  }

  .txt {
    @extend .title;
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
    @extend .title;
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
</style>