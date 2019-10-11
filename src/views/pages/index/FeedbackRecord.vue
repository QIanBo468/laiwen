<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('index.反馈记录')}}</span>
    </div>

    <div class="item" v-for="item in 4">
      <div class="ask">
        <div class="icon">{{$t('index.问')}}</div>
        <div class="content">
          <div class="title">
            <span>可不可以增加矿机的种类呢？</span>
          </div>
          <img src="@/assets/img/home.png" alt />
          <div class="time">2019.06.12 13:00:54</div>
        </div>
      </div>
      <div class="answer">
        <div class="content">
          <div class="title">
            <span>明天上新哦~敬请期待！</span>
          </div>
          <div class="time">2019.06.12 13:00:54</div>
        </div>
        <div class="icon">{{$t('index.答')}}</div>
      </div>
    </div>
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
  border-radius: 6px;
  background-color: #281a00;
  margin: 10px 20px;

  .ask {
    padding: 10px;
    display: flex;

    .icon {
      padding: 2px 5px;
      background-color: #1890ff;
      color: #000;
      border-radius: 50px;
      line-height: 20px;
      height: fit-content;
      text-align: center;
      font-size: 14px;
      margin-right: 10px;
    }
    .content {
      .title {
        span {
          color: #ffffff;
          font-size: 14px;
        }
      }
      & > img {
        max-width: 100%;
      }
      .time {
        color: #a1937d;
      }
    }
  }

  .answer {
    @extend .ask;
    display: flex;
    justify-content: flex-end;

    .icon {
      background-color: #f84d4d;
      margin-left: 10px;
      margin-right: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>