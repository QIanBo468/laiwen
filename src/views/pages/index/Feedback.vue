<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png" @click="$router.go(-1)" />
      <div>{{$t('index.问题反馈')}}</div>
      <router-link tag="span" to="FeedbackRecord">{{$t('index.反馈记录')}}</router-link>
    </div>

    <div class="textarea">
      <textarea autofocus :placeholder="$t('index.请输入您要反馈的内容')"></textarea>
      <div>0/200</div>
    </div>

    <div class="money_type">
      <i></i>
      <span>{{$t('index.上传截图')}}</span>
    </div>

    <div class="upload">
      <van-uploader v-model="fileList" multiple :max-count="9" />
    </div>

    <button>{{$t('index.提交')}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    };
  }
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

.textarea {
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #c7c7cc;

  textarea {
    width: 100%;
    border-radius: 4px 4px 0 0;
    background: rgba(40, 26, 0, 1);
    border: none;
    padding: 10px;
  }

  div {
    width: 100%;
    text-align: end;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 0 0 4px 4px;
    background: rgba(40, 26, 0, 1);
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
.upload {
  padding: 7px 15px;

  /deep/ .van-uploader__upload {
    background-color: #281a00;
    border: 1px dashed rgba(67, 46, 0, 1);
  }
}
button {
  width: 92%;
  background: linear-gradient(
    137deg,
    rgba(233, 215, 177, 1) 0%,
    rgba(200, 168, 113, 1) 100%
  );
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 200px;
  padding: 14px 0;
  font-size: 17px;
  color: #705827;
}
</style>