<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.充值')}}</span>
    </div>

    <div class="items">
      <div class="item">
        <div class="title">
          <i></i>
          <span>{{$t('assets.充值收款账号')}}</span>
        </div>
        <div class="card_box">
          <div class="card" v-for="(item,index) in list" :key="index">
            <img :src="item.pic" alt />
            <div class="content">
              <div class="content_title">{{item.type | type(item.bankType)}}</div>
              <div class="content_data_box">
                <div>
                  <span>{{$t("assets.账户名称")}}：</span>
                  <span>{{item.accountName}}</span>
                </div>
                <div>
                  <span>{{$t("assets.账号")}}：</span>
                  <span>{{item.accountNo}}</span>
                </div>
                <div v-if="item.type == 3">
                  <span>{{$t("assets.开户行")}}：</span>
                  <span>{{item.bankName}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="card">
            <img src="@/assets/img/bank.png" alt />
            <div class="content">
              <div class="content_title">
                <span>中国工商银行支付</span>
                <div class="more">{{$t("assets.查看全部")}}></div>
              </div>
              <div class="content_data_box">
                <div>
                  <span>{{$t("assets.账户名称")}}：</span>
                  <span>ddd</span>
                </div>
                <div>
                  <span>{{$t("assets.账号")}}：</span>
                  <span>6222123422223333333333322222225678945</span>
                </div>
                <div>
                  <span>{{$t("assets.开户行")}}：</span>
                  <span>622212345678945</span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:'',
    }
  },
  filters:{
    type(val,type){
      if(val == 1){
        return '支付宝支付'
      }else if(val == 2){
        return '微信支付'
      }else if(val == 3){
        return type
      }
    }
  },
  mounted() {
    this.$post({
            module: "User",
            interface: 7000,
            success: res => {
                console.log("莱文币充值", res);
                if (res.data.code == 0) {
                  this.list = res.data.data.list;
                }
            }
        });
  },
};
</script>
<style scoped lang="scss">
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
.items {
  padding: 13px 16px;

  .item {
    .title {
      color: #ffffff;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;

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

    .card_box {
      background-color: #281a00;
      border-radius: 6px;
      padding: 0 14px;

      .card {
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #707070;
        &:last-child {
          border: none;
        }
        img {
          width: 90px;
          height: 90px;
        }

        .content {
          flex: 1;
          min-height: 90px;
          margin-left: 15px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          overflow: auto;

          .content_title {
            font-size: 16px;
            color: #ffffff;
            flex: 1;
            display: flex;
            justify-content: space-between;

            .more {
              background-color: rgba(255, 255, 255, 0.1);
              height: fit-content;
              padding: 2px 10px;
              border-radius: 50px;
              font-size: 11px;
              color: #d8c2a1;
              white-space: nowrap;
            }
          }
          .content_data_box {
            flex: 1;
            font-size: 14px;
            color: #fff7de;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>