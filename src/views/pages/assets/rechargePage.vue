<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <span>{{$t('assets.充币')}}</span>
    </div>

    <div class="card">
      <div class="title">我的钱包地址</div>
      <div class="card_content">sjkhg4jkad3</div>
      <button>{{$t('assets.复制')}}</button>
      <div class="code_img">
        <img src="@/assets/img/code.png" alt />
      </div>
      <div class="remark">长按二维码识别</div>
    </div>

    <div class="money_type">
      <i></i>
      <span>{{$t('assets.充币说明')}}</span>
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

.card {
  background: linear-gradient(
    137deg,
    rgba(233, 215, 177, 1) 0%,
    rgba(200, 168, 113, 1) 100%
  );
  border-radius: 6px;
  padding: 25px 20px;
  width: calc(100% - 100px);
  margin: 0 auto;
  margin-top: 10px;
  text-align: center;

  .title {
    color: #705827;
    font-size: 14px;
  }
  .card_content {
    font-size: 20px;
    margin: 17px 0;
    color: #705827;
  }
  button {
    background: linear-gradient(
      137deg,
      rgba(246, 180, 109, 1) 0%,
      rgba(236, 128, 24, 1) 100%
    );
    box-shadow: 0px 5px 5px rgba(185, 93, 3, 0.3);
    opacity: 1;
    border-radius: 18px;
    color: #fff;
    margin: 0 auto 25px;
    padding: 5px 30px;
  }
  .code_img {
    border-top: 1px dashed #705827;
    padding: 17px 0;

    img {
      width: 110px;
    }
  }
  .remark {
    color: #705827;
    font-size: 12px;
  }
}

.money_type {
  padding: 13px 16px;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;

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
.content {
  font-size: 14px;
  color: #fff;
  padding: 0 15px;
  text-indent: 2em;
}
</style>
