
<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>USDT</span>
    </div>

    <div class="card">
      <div class="title">
        <span>{{name}}</span>
         <router-link to="rechargePage">
            <translate position="flash" class="recharge">{{$t('assets.充币')}}</translate>
          </router-link>
      </div>
      <div class="money">{{number}}</div>
      <div class="option">
        <router-link  to="getCoinUsdt" tag="div">
          <img src="@/assets/img/tixian_icon.png" />
          <span>{{$t('assets.提币')}}</span>
        </router-link>
        <router-link  to="exchangeusdt" tag="div">
          <img src="@/assets/img/duihuan_icon.png" />
          <span>{{$t('assets.兑换')}}</span>
        </router-link>
        <!-- <div>
          <img src="@/assets/img/zhuanzhang_icon.png" />
          <span>{{$t('assets.转账')}}</span>
        </div> -->
      </div>
    </div>

    <van-tabs
      v-model="active"
      background="#271B00"
      title-active-color="#fff"
      title-inactive-color="#D8C2A1"
      sticky
      animated
    >
      <van-tab :title="$t('assets.全部')">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :finished-text="$t('my.已全部加载完毕')"
                    @load="onLoad"
                >
                    <translate position="top" class="tab_box">
                        <div class="item" v-for="(item,index) in list" :key="index">
                            <div class="text">
                                <div>{{item.remark}}</div>
                                <div>{{item.createdAt}}</div>
                            </div>
                            <span>{{item.num}}</span>
                        </div>
                    </translate>
                </van-list>
            </van-tab>
            <van-tab :title="$t('assets.收入')">
                <van-list
                    v-model="loading1"
                    :finished="finished1"
                    :finished-text="$t('my.已全部加载完毕')"
                    @load="onLoad1"
                >
                    <translate position="top" class="tab_box">
                        <div class="item" v-for="(item,index) in list1" :key="index">
                            <div class="text">
                                <div>{{item.remark}}</div>
                                <div>{{item.createdAt}}</div>
                            </div>
                            <span>{{item.num}}</span>
                        </div>
                    </translate>
                </van-list>
            </van-tab>
            <van-tab :title="$t('assets.支出')">
                <van-list
                    v-model="loading2"
                    :finished="finished2"
                    :finished-text="$t('my.已全部加载完毕')"
                    @load="onLoad2"
                >
                    <translate position="top" class="tab_box">
                        <div class="item" v-for="(item,index) in list2" :key="index">
                            <div class="text">
                                <div>{{item.remark}}</div>
                                <div>{{item.createdAt}}</div>
                            </div>
                            <span>{{item.num}}</span>
                        </div>
                    </translate>
                </van-list>
            </van-tab>
    </van-tabs>

    <van-popup :style="{width: '70%'}" :close-on-click-overlay="false" v-model="isShow">
        <div class="van_body">
            <div class="title">{{$t("assets.绑定手机号")}}</div>
            <div class="content" v-html="$t('assets.为保护您的账户安全,请先绑定手机号')"></div>
            <button class="btn" @click="$router.push('tell')">{{$t('assets.立即绑定')}}</button>
            <div class="recharge" @click="isShow=false">{{$t("public.取消")}}</div>
        </div>
    </van-popup>
  </div>
</template>
<script>
export default {
    data() {
      return {
        name: "", //名称
              number: "", //数量
              active: 0,
              list: [], //全部数据
              finished: false, //加载状态
              loading: false, //加载状态
              page: 1, //页码
              lastId: 0, //最新id
              direction: 0, //状态
              list1: [], //全部数据
              finished1: false, //加载状态
              loading1: false, //加载状态
              page1: 1, //页码
              lastId1: 0, //最新id
              direction1: 0, //状态
              list2: [], //全部数据
              finished2: false, //加载状态
              loading2: false, //加载状态
              page2: 1, //页码
              lastId2: 0, //最新id
              direction2: 0, //状态
              isShow:false,
      };
    },
    mounted() {
      // 获取个人信息 确定是否绑定手机号
        this.$post({
            module: "User",
            interface: 1000,
            success: res => {
                console.log("用户信息", res);
                if (res.data.code == 0) {
                   if(res.data.data.mobile == null || res.data.data.mobile == undefined || res.data.data.mobile == ''){
                      this.isShow = true;
                   }
                }
            }
        });
    },
    methods: {
        // 获取信息
        onLoad() {
            this.$post({
                module: "Finance",
                interface: 2100,
                data: {
                    lastId: this.lastId,
                    page: this.page,
                    creditType: "credit_14",
                    direction: ""
                },
                success: res => {
                    console.log("信息全部", res);
                    if (res.data.code == 0) {
                        this.name = res.data.data.creditName;
                        this.number = res.data.data.creditValue;
                        this.lastId = res.data.data.lastId;
                        if (res.data.data.lastPage == 1) {
                            this.list = res.data.data.list;
                            this.loading = false;
                            this.finished = true;
                        } else {
                            this.list = this.list.concat(res.data.data.list);
                            this.loading = false;
                            this.page++;
                            if (
                                res.data.data.lastPage ==
                                res.data.data.currentPage
                            ) {
                                this.finished = true;
                            }
                        }
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                }
            });
        },
        // 获取信息
        onLoad1() {
            this.$post({
                module: "Finance",
                interface: 2100,
                data: {
                    lastId: this.lastId1,
                    page: this.page1,
                    creditType: "credit_14",
                    direction: 1
                },
                success: res => {
                    console.log("信息收入", res);
                    if (res.data.code == 0) {
                        this.name = res.data.data.creditName;
                        this.number = res.data.data.creditValue;
                        this.lastId1 = res.data.data.lastId;
                        if (res.data.data.lastPage == 1) {
                            this.list1 = res.data.data.list;
                            this.loading1 = false;
                            this.finished1 = true;
                        } else {
                            this.list1 = this.list1.concat(res.data.data.list);
                            this.loading1 = false;
                            this.page1++;
                            if (
                                res.data.data.lastPage ==
                                res.data.data.currentPage
                            ) {
                                this.finished1 = true;
                            }
                        }
                    } else {
                        this.loading1 = false;
                        this.finished1 = true;
                    }
                }
            });
        },
        // 获取信息
        onLoad2() {
            this.$post({
                module: "Finance",
                interface: 2100,
                data: {
                    lastId: this.lastId2,
                    page: this.page2,
                    creditType: "credit_14",
                    direction: -1
                },
                success: res => {
                    console.log("信息支出", res);
                    if (res.data.code == 0) {
                        this.name = res.data.data.creditName;
                        this.number = res.data.data.creditValue;
                        this.lastId2 = res.data.data.lastId;
                        if (res.data.data.lastPage == 1) {
                            this.list2 = res.data.data.list;
                            this.loading2 = false;
                            this.finished2 = true;
                        } else {
                            this.list2 = this.list2.concat(res.data.data.list);
                            this.loading2 = false;
                            this.page2++;
                            if (
                                res.data.data.lastPage ==
                                res.data.data.currentPage
                            ) {
                                this.finished2 = true;
                            }
                        }
                    } else {
                        this.loading2 = false;
                        this.finished2 = true;
                    }
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
  width: calc(100% - 30px);
  margin: 15px auto;
  background: linear-gradient(
    89deg,
    #815efd 0%,
    #b775ff 100%
  );

  border-radius: 6px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 16px 25px;

    > span {
      color: #ffffff;
      font-size: 16px;
    }
    .recharge {
      background-image: url(../../../assets/img/chongbi_bg.png);
      background-size: 100% 100%;
      padding: 3px 17px 7px 33px;
      color: #705827;
      font-size: 14px;
      text-align: center;
      transform: translateX(4px);
    }
  }
  .money {
    font-size: 28px;
    color: #ffffff;
    padding-left: 25px;
    margin-bottom: 16px;
  }

  .option {
    display: flex;
    background-color: #b881ff;
    border-radius: 6px;

    div {
      flex: 1;
      text-align: center;
      padding: 14px 0;
      color: #fff;
      font-size: 12px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }
}

/deep/ .van-tabs__line {
  background: linear-gradient(
    137deg,
    rgba(246, 180, 109, 1) 0%,
    rgba(236, 128, 24, 1) 100%
  );
}

.tab_box {
  margin-top: 14px;

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
.van_body {
    background: linear-gradient(
        137deg,
        rgba(233, 215, 177, 1) 0%,
        rgba(200, 168, 113, 1) 100%
    );
    padding: 28px 20px 20px;
    border-radius: 6px;
    text-align: center;

    .title {
        color: #705827;
        font-size: 18px;
        font-weight: bold;
    }
    .content {
        color: #705827;
        font-size: 15px;
        margin-top: 10px;
    }
    .btn {
        color: #705827;
        background-color: #fff7de;
        border-radius: 50px;
        width: 100%;
        font-size: 15px;
        margin-top: 15px;
        padding: 5px 0;
    }
    .recharge {
        color: #fff;
        width: fit-content;
        margin: 0 auto;
        padding: 0 5px;
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>