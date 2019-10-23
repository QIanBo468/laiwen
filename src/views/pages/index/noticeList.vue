<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('index.公告')}}</span>
    </div>

    <translate position="top">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getIncome"
        :offset="0"
      >
        <div class="item" v-for="(item,index) in newsList" :key="index">
          <div class="text">
            <div>MED平台正式上线了！敬请期待</div>
            <div>2019.06.12 14:12:45</div>
          </div>
          <img src="@/assets/img/gonggao_more.png" />
        </div>
      </van-list>
    </translate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList:[], //公告列表数据
      currentPage: 1, //当前页
      loading: false,
      finished: false,
    }
  },
  methods: {
    //获取我的收益
    getIncome() {
      var creditTypes = "";
      if (this.radio == "1") {
        creditTypes = "credit_1";
      } else if (this.radio == "2") {
        creditTypes = "credit_8";
      } else if (this.radio == "3") {
        creditTypes = "credit_7";
      }
      this.$post({
        module: "Finance",
        interface: 2101,
        data: {
          lastId: this.lastId,
          page: this.currentPage,
          creditTypes: creditTypes
        },
        success: res => {
          console.log("获取我的收益", res);
          if (res.data.code == 0) {
            this.lastId = res.data.data.lastId;
            if(res.data.data.list == 0){
              this.finished = true;
            } else {
              if(this.currentPage == 1){
                this.list = res.data.data.list;
              } else {
                var rex = res.data.data.list;
                this.list = this.list.concat(rex);
              }
            }
          } else {
            this.finished = true;
            this.$toast({
              duration: 1000,
              message: res.data.message
            });
          }
        }
      });
      this.loading = false;
      this.currentPage++;
    }
  },
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

  img {
    width: 22px;
    height: 22px;
  }
}
</style>