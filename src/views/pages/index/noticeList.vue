<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('index.公告')}}</span>
    </div>

    <translate position="top">
      <router-link tag="div" to="notice" class="item" v-for="item in 4">
        <div class="text">
          <div>MED平台正式上线了！敬请期待</div>
          <div>2019.06.12 14:12:45</div>
        </div>
        <img src="@/assets/img/gonggao_more.png" />
      </router-link>
    </translate>
  </div>
</template>

<script>
export default {};
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