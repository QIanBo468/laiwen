
<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('investment.投资记录')}}</span>
    </div>

    <div class="income_box">
      <div class="income_left">
        <div>{{$t('investment.总投资金额')}}:</div>
        <div>{{amount}}</div>
      </div>
      <div class="income_right">
        <div>{{$t('investment.总收益金额')}}:</div>
        <div>{{grantedYield}}</div>
      </div>
    </div>

    <div class="money_type">
      <i></i>
      <span>{{$t('investment.投资记录')}}</span>
    </div>

    <translate position="top">
      <div class="item" v-for="item in list" :key="it">
        <div class="title">投资</div>
        <div class="num_box">
          <div>
            <div class="num">{{item.amount}}</div>
            <div class="txt">{{$t('investment.投资金额')}}</div>
          </div>
          <div>
            <div class="num">{{item.grantedYield}}</div>
            <div class="txt">{{$t('investment.累计收益')}}</div>
          </div>
          <div>
            <div class="num">{{item.days}}</div>
            <div class="txt">{{$t('investment.累计天数')}}</div>
          </div>
        </div>
        <div class="time_box">
          <div>
            <div class="num">{{item.createdAt}}</div>
            <div class="txt">{{$t('investment.投资时间')}}</div>
          </div>
          <div>
            <div class="num">{{item.expiredAt}}</div>
            <div class="txt">{{$t('investment.结束时间')}}</div>
          </div>
        </div>
      </div>
    </translate>
    <!-- 加载完毕提示 -->
    <div v-if="isEndShow == 1">
      <p class="jzwb">已全部加载完毕</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      grantedYield:0,
      amount:0,
      list:[],
      is_show: false,
      lastId:0,
      page:1,
      isEnd:0,
      isEndShow:0,
    };
  },
  mounted() {
    this.getData();
    window.addEventListener('scroll', this.scrollEvent,false);
  },
  methods: {
      scrollEvent(){
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight) {
          if(this.isEnd == 0){
            console.log('加载下一页',this.isEnd,this.page)
            this.page =  parseInt(this.page)+1
            this.getData()
          }
        }
      },
      getData(){
        var that = this
        this.$post({
            module: "Investment",
            interface: 4000,
            data:{
              page:this.page,
              lastId:this.lastId
            },
            success: res => {
                if (res.data.code == 0) {
                    // this.data = res.data.data
                    if(res.data.data.list.length == 0){
                      that.isEnd = 1;
                      that.isEndShow = 1;
                      return ;
                    }
                    that.list = that.list.concat(res.data.data.list)
                    that.lastId = res.data.data.lastId
                    that.amount = res.data.data.amount
                    that.grantedYield = res.data.data.grantedYield
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
  .jzwb{
    text-align:center;
    color:#ccc;
  }
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
  .income_box {
    display: flex;
    width: 92%;
    margin: 10px auto;
    color: #ffffff;

    .income_left {
      height: 100px;
      background: linear-gradient(
        137deg,
        rgba(246, 180, 109, 1) 0%,
        rgba(236, 128, 24, 1) 100%
      );
      opacity: 1;
      border-radius: 6px 0 0 6px;
      padding: 15px 14px 32px;
      transform: translateX(2px);
      flex: 1;

      div:first-child {
        font-size: 13px;
      }

      div:last-child {
        font-size: 20px;
        line-height: 40px;
      }
    }
    .income_right {
      @extend .income_left;
      border-radius: 6px;
      transform: translateX(-2px);
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

  .item {
    background-color: #281a00;
    border-radius: 6px;
    width: calc(100% - 30px);
    margin: 0 auto;
    margin-bottom: 15px;

    .title {
      font-size: 18px;
      color: #ffffff;
      padding: 12px 15px 0;
    }

    .num_box {
      display: flex;
      justify-content: space-between;
      color: #fff7de;
      padding: 5px 15px;

      & > div {
        .num {
          font-size: 14px;
          text-align: center;
        }
        .txt {
          font-size: 12px;
        }
      }
    }

    .time_box {
      @extend .num_box;
      & > div {
        .num {
          text-align: start;
        }
      }
      border-top: 1px solid rgba(67, 46, 0, 1);
    }
  }
</style>