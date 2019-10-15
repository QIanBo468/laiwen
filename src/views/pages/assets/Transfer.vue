<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.转账记录')}}</span>
    </div>

    <translate position="top">
      <div class="item">
        <div class="title">
          <span>矿机收益</span>
        </div>
        <div class="txt">
          <span>矿机收益</span>
          <span>10000</span>
        </div>
        <div class="time">
          <span>2019.07.12 13:45:12</span>
          <span>{{$t("assets.手续费")}}：123</span>
        </div>
      </div>
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