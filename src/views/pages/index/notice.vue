<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('index.公告')}}</span>
    </div>

    <div class="title">MED平台正式上线了！敬请期待</div>
    <div class="time">
      <span>2019.06.12 14:12:45</span>
    </div>
    <div class="content">
      <p>服从经济学的角度，我们要尊重别人的财富，不能见猎心喜、顺手牵羊，这是普世的价值观。在公正观的背后，是效率考量：保护产权的女里是会消耗资源的，这种消耗越大，资源的净值月底，社会的道德规范，越是能够帮助降低这种消耗，社会财富的积累就越多。</p>
      <p>（1）同样，管理中建立规则也是一样，规则存在的意义在于树立通行的行为规范（或是职业行为准则），基于这种行为准则，形成通行的惯例，非商业转载请注明出处。</p>
      <p>（2）同样，管理中建立规则也是一样，规则存在的意义在于树立通行的行为规范（或是职业行为准则），基于这种行为准则，形成通行的惯例，非商业转载请注明出处。</p>
      <p>（3）同样，管理中建立规则也是一样，规则存在的意义在于树立通行的行为规范（或是职业行为准则），基于这种行为准则，形成通行的惯例，非商业转载请注明出处。</p>
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
.title {
  font-size: 15px;
  color: #ffffff;
  text-align: center;
  margin: 20px 0 0;
}
.time {
  text-align: end;
  font-size: 12px;
  color: #c7c7cc;
  margin: 5px 17px;
}
.content {
  font-size: 14px;
  color: #fff;
  padding: 0 26px;
  text-indent: 2em;
}
</style>