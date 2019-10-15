<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <div>{{$t('assets.地址簿')}}</div>
      <span>{{$t('public.确定')}}</span>
    </div>

    <translate position="top">
      <van-radio-group v-model="radio" checked-color="#C8A871">
        <div class="item" v-for="item in 2">
          <img src="@/assets/img/gonggao_more.png" alt />
          <div class="text">
            <div>MED平台正式上线了！敬请期待</div>
            <div>2019.06.12 14:12:45</div>
          </div>
          <van-radio name="1"></van-radio>
        </div>
      </van-radio-group>
    </translate>
  </div>
</template>

<script>
export default {
  data() {
    return { radio: "0" };
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
</style>