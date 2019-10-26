<template>
  <div class="index">
    <div class="nav">
      <van-switch v-model="checked"
                  size="20px"
                  active-color="#D5AB64"
                  inactive-color="#0C0C0C"
                  @change="localchange" />
      <p>{{localStorage}}</p>
    </div>
    <van-swipe :autoplay="3000"
               indicator-color="white"
               :height="160">
      <van-swipe-item v-for="(item,index) in carouselList"
                      :key="index">
        <img :src="item.src"
             width="100%"
             height="100%" />
      </van-swipe-item>
    </van-swipe>

    <div class="my_notice">
      <img src="@/assets/img/tz.png" />
      <span>{{news}}</span>
      <router-link tag="div"
                   to="noticeList"
                   class="more">{{$t('index.更多')}}></router-link>
    </div>

    <div class="items">
      <router-link to="inCome"
                   tag="div"
                   class="item">
        <translate position="right"
                   time="0.4s">
          <span>{{$t('index.我的收益')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
      <router-link to="register"
                   class="item">
        <translate position="left"
                   time="0.4s">
          <span>{{$t('index.注册会员')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
      <router-link to="Feedback"
                   class="item">
        <translate position="right"
                   time="0.6s">
          <span>{{$t('index.问题反馈')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
      <router-link to="CompanyProfile"
                   class="item">
        <translate position="left"
                   time="0.6s">
          <span>{{$t('index.公司简介')}}</span>
          <img src="@/assets/img/in.png" />
        </translate>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      localStorage: "En",
      carouselList: [], //轮播图数据
      news: "" //最新公告
    };
  },
  computed: {
    checked () {
      if (localStorage.getItem("lang") == "en") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    localchange () {
      if (this.checked) localStorage.setItem("lang", "zh");
      else localStorage.setItem("lang", "en");
      this.$router.go(0);
    },
    //获取轮播图
    getCarousel () {
      this.$post({
        module: "Content",
        interface: 1000,
        success: res => {
          console.log("获取轮播图", res);
          if (res.data.code == 0) {
            this.carouselList = res.data.data.list;
          } else {
            this.$toast({
              duration: 1000,
              message: res.data.message
            });
          }
        }
      });
    },
    //获取公告最新数据
    getNews () {
      this.$post({
        module: "Content",
        interface: 3002,
        success: res => {
          console.log("获取公告最新数据", res);
          if (res.data.code == 0) {
            this.news = res.data.data.info.title;
          } else {
            this.$toast({
              duration: 1000,
              message: res.data.message
            });
          }
        }
      });
    }
  },
  created () {
    if (localStorage.getItem("lang") == "en") this.localStorage = "En";
    else this.localStorage = "中";
    this.getCarousel();
    this.getNews();
  }
};
</script>
<style lang="scss" scoped>
.van-swipe {
  width: 92%;
  margin: 0 auto;
}
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 15px;
  background-color: #0c0c0c;
  p {
    font-size: 14px;
    color: #ffffff;
    margin-left: 10px;
  }
  /deep/.van-switch {
    border: 1px solid #d5ab64;
  }
}

.my_notice {
  width: 92%;
  margin: 14px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  background: rgba(223, 179, 36, 0.2);
  border-radius: 50px;
  padding: 6px 10px;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div {
    border-radius: 50px;
    background: rgba(165, 128, 33, 0.4);
    padding: 0 10px;
    font-size: 12px;
  }
}

.items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 92%;
  margin: 0 auto;

  .item {
    width: 48%;
    font-size: 20px;
    color: #ffffff;
    background-size: 100% 100%;
    padding: 27px 20px 45px;
    margin-bottom: 4%;

    &:nth-child(1) {
      background-image: url(../../assets/img/bg_2.png);
    }
    &:nth-child(2) {
      background-image: url(../../assets/img/bg_3.png);
    }
    &:nth-child(3) {
      background-image: url(../../assets/img/bg_5.png);
    }
    &:nth-child(4) {
      background-image: url(../../assets/img/bg_4.png);
    }

    img {
      width: 17px;
      height: 17px;
      margin-left: 8px;
    }
  }
}
</style>
