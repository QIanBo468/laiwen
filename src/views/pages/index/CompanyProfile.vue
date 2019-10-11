<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('index.公司简介')}}</span>
    </div>
    <div class="banner">
      <img src="@/assets/img/about_us_wish_content1.png" alt />
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
    border-radius: 6px;
  }
  span {
    color: #ffffff;
    font-size: 18px;
    flex: 1;
    text-align: center;
  }
}
.banner {
  padding: 11px 15px 17px;
  img {
    width: 100%;
  }
}
.content {
  font-size: 14px;
  color: #fff;
  padding: 0 15px;
  text-indent: 2em;
}
</style>