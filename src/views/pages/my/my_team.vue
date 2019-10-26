<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.我的团队')}}</span>
    </div>
    <div class="user_data">
      <div class="img">
        <img :src="userInfo.avatar"
             alt />
      </div>
      <div class="user_txt">
        <div class="title">
          <span>{{userInfo.nickname}}</span>
          <div class="tag">{{userInfo.level}}</div>
        </div>
        <div class="content">ID:{{userInfo.account}}</div>
      </div>
    </div>
    <div class="list_box">
      <div>
        <p>{{$t('my.已获得推广收益')}}</p>
        <p style="font-size: 28px;">{{amount}}</p>
        <div>
          <div>
            <p style="font-size: 16px;">{{$t('my.团队总人数')}}</p>
            <p>{{number}}{{$t('my.人')}}</p>
          </div>
          <div>
            <p style="font-size: 16px;">{{$t('my.直推用户')}}</p>
            <p>{{total}}{{$t('my.人')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="item"
           v-for="item in list">
        <div class="text">
          <div>{{item.nickname}}</div>
          <div>{{item.userTime}}</div>
        </div>
        <span>{{item.amount}}</span>
      </div>
    </div>
    <!-- 加载完毕提示 -->
    <div v-if="isEndShow == 1">
      <p class="jzwb">已全部加载完毕</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo:{
          account: "",
          avatar: "",
          icon: "",
          id: 0,
          level: "",
          mobile: "*",
          nickname: ""
      },

      amount:0,
      number:0,
      total:0,
      list:[],
      is_show: false,
      lastId:0,
      page:1,
      isEnd:0,
      isEndShow:0,
      id:0,
    }
  },
  mounted() {
    this.user();
    window.addEventListener('scroll', this.scrollEvent,false);
  },
  methods: {
    // 用户基本信息
    user(){
        this.$post({
            module: "User",
            interface: 1000,
            success: res => {
                if (res.data.code == 0) {
                    this.userInfo = res.data.data;
                    this.getData();
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
          this.getData()
        }
      }
    },
    getData(){
      var that = this
      this.$post({
          module: "User",
          interface: 4101,
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
                  that.number = res.data.data.number
                  that.total = res.data.data.total
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
  .user_data {
    display: flex;
    align-items: center;
    color: #fff;

    .img {
      width: 55px;
      height: 55px;
      overflow: hidden;
      margin: 15px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50px;
      }
      .type {
        transform: translateY(-100%);
        background: linear-gradient(
          89deg,
          rgba(254, 116, 116, 1) 0%,
          rgba(253, 170, 115, 1) 100%
        );
        border-radius: 50px;
        font-size: 11px;
        text-align: center;
      }
    }
    .user_txt {
      flex: 1;
      .title {
        display: flex;
        span {
          font-size: 18px;
        }
        .tag {
          color: #705827;
          padding: 0 11px 0 24px;
          margin-left: 10px;
          background-image: url(../../../assets/img/bg1.png);
          background-size: 100% 100%;
        }
      }
      .content {
        font-size: 13px;
      }
    }
    > img {
      width: 24px;
      height: 24px;
      margin-right: 15px;
    }
  }
  .list_box {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    > div {
      background: linear-gradient(
        137deg,
        rgba(246, 180, 109, 1) 0%,
        rgba(236, 128, 24, 1) 100%
      );
      opacity: 1;
      border-radius: 6px;
      padding: 5px 15px;
      > p {
        color: #fff;
        font-size: 16px;
        padding: 8px 0;
      }
      > div {
        width: 100%;
        margin-top: 12px;
        border-top: 1px solid #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 5px;
        > div {
          width: 50%;
          border-right: 1px solid #fff;
          color: #fff;
          font-size: 18px;
        }
        > div:last-child {
          border-right: none;
          padding-left: 20px;
        }
      }
    }
  }
  .box {
    width: 100%;
    background: #271b00;
    margin-top: 14px;
    padding-bottom: 10px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #281a00;
      padding: 11px 26px;
      border-bottom: 1px solid rgba(67, 46, 0, 1);

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

      span {
        color: #fff;
        font-size: 16px;
      }
    }
  }
</style>
