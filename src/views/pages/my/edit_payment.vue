<template>
  <div>
    <div class="nav">
      <img src="@/assets/img/back.png"
           @click="$router.go(-1)" />
      <span>{{$t('my.修改收款方式')}}</span>
    </div>
    <div class="box">
      <!-- 银行卡 -->
      <div v-if="is_type==3">
        <div class="nav_box">
          <span></span>
          <p>{{$t('my.银行')}}</p>
        </div>
        <div class="inp_box">
          <input type="text"
                 :placeholder="$t('my.请输入银行')"
                 v-model="bankCode">
        </div>
        <div class="nav_box">
          <span></span>
          <p>{{$t('my.账户名称')}}</p>
        </div>
        <div class="inp_box">
          <input type="text"
                 :placeholder="$t('my.输入账户名称')"
                 v-model="owner">
        </div>
        <div class="nav_box">
          <span></span>
          <p>{{$t('my.账号')}}</p>
        </div>
        <div class="inp_box">
          <input type="text"
                 :placeholder="$t('my.输入账号')"
                 v-model="cardNo">
        </div>
        <div class="nav_box">
          <span></span>
          <p>{{$t('assets.开户行')}}</p>
        </div>
        <div class="inp_box">
          <input type="text"
                 :placeholder="$t('my.输入开户行')"
                 v-model="bankSubbranch">
        </div>
      </div>
      <!-- 支付宝微信 -->
      <div v-if="is_type==2 || is_type==1">
        <div class="nav_box">
          <span></span>
          <p>{{$t('my.微信/支付宝名称')}}</p>
        </div>
        <div class="inp_box">
          <input type="text"
                 :placeholder="$t('my.输入账户名称')"
                 v-model="owner">
        </div>
        <div class="nav_box">
          <span></span>
          <p>{{$t('my.微信/支付宝账号')}}</p>
        </div>
        <div class="inp_box">
          <input type="text"
                 :placeholder="$t('my.请输入对应的账号')"
                 v-model="cardNo">
        </div>
        <div class="nav_box">
          <span></span>
          <p>{{$t('my.上传收款码')}}</p>
        </div>
        <!-- <div class="img_nav_box">
          <label for="inp">
            <img src="@/assets/img/tianjia.png"
                 alt="">
            <input type="file"
                   id="inp">
          </label>
        </div> -->
        <div class="upload">
          <div v-if="logo != ''">
              <img :src="logo" alt class="pic" />
              <img src="@/assets/img/del.png" alt class="del" @click="delimg()" />
          </div>
          <label for="file" v-if="logo == ''">
              <input
                  type="file"
                  style="display:none;"
                  @change="uploads($event)"
                  ref="front"
                  id="file"
              />
          </label>
        </div>
      </div>
      <div class="btn_outer">
        <button class="btn" @click="sub_bank()">{{$t('my.确定')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: 0,
      owner: '',
      cardNo: '',
      bankCode: '',
      bankSubbranch: '',
      logo: '',
      is_type: this.$route.query.type,//1 银行卡 2 微信支付宝
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      var id = this.$route.query.id
      this.id = id;
      this.$post({
          module: "Finance",
          interface: 1004,
          data: {
            id:id
          },
          success: res => {
              if (res.data.code == 0) {
                this.is_type = res.data.data.cardType;
                this.owner = res.data.data.owner;
                this.cardNo = res.data.data.cardNo;
                this.bankCode = res.data.data.bankCode;
                this.bankSubbranch = res.data.data.bankSubbranch;
                this.logo = res.data.data.logo;
              }
              else{
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
              }
          }
      });
    },
    //上传图片
    uploads() {
        let file = this.$refs.front.files[0]; //获取文件详细信息
        if (file == null || file == undefined) {
            return;
        }
        let param = new FormData();
        param.append("avatar", file);
        this.uploadImg(param);
    },
    uploadImg(param) {
        this.$axios
            .post(this.httpPaths, param, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("Bearer")
                }
            })
            .then(res => {
                if (res.data.code == 0) {
                    this.logo = res.data.data.avatar;
                } else {
                    this.$toast({
                        message: res.data.message,
                        duration: 1000
                    });
                }
            });
    },
    // 删除 图片
    delimg(index) {
        this.logo = '';
    },
    changeFiles () { },
    //提交收款方式
    sub_bank(){
      this.$post({
        module: "Finance",
        interface: 1005,
        data: {
            id: this.id,
            owner: this.owner,
            cardNo: this.cardNo,
            bankCode: this.bankCode,
            bankSubbranch: this.bankSubbranch,
            logo: this.logo,
            cardType: this.is_type,
        },
        success: res => {
            
            if (res.data.code == 0) {
                this.$toast({
                    duration: 1000,
                    message: this.$t('my.修改账号成功')
                });
                this.$router.replace("/payment");
            }
            else{
                this.$toast({
                    duration: 1000,
                    message: res.data.message
                });
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
  .box {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .nav_box {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 0;
      span {
        display: inline-block;
        width: 6px;
        height: 15px;
        background: linear-gradient(
          180deg,
          rgba(255, 147, 12, 1) 0%,
          rgba(255, 80, 0, 1) 100%
        );
        border-radius: 5px;
      }
      p {
        padding-left: 15px;
        flex: 1;
        color: #ffffff;
        font-size: 16px;
      }
    }
    .inp_box {
      width: 100%;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(40, 26, 0, 1);
      opacity: 1;
      border-radius: 6px;
      input {
        flex: 1;
        padding: 0 10px 0 0;
        border: none;
        background: none;
        color: #ffffff;
        font-size: 16px;
      }
      input::-webkit-input-placeholder {
        color: #ffffff;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
    .img_nav_box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      label {
        width: 100px;
        height: 100px;
        img {
          width: 100px;
          height: 100px;
        }
        input {
          display: none;
          width: 100px;
          height: 100px;
        }
      }
    }
    .btn_outer {
      padding: 15px;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      .btn {
        box-sizing: border-box;

        background: linear-gradient(
          137deg,
          rgba(233, 215, 177, 1) 0%,
          rgba(200, 168, 113, 1) 100%
        );
        border-radius: 6px;
        color: #705827;
        padding: 10px 0;
        width: 100%;
      }
    }
  }
  .upload {
    padding: 7px 15px;
    display: flex;
    flex-wrap: wrap;
    label {
        width: 80px;
        height: 80px;
        display: block;
        background: url("../../../assets/img/tianjia.png") no-repeat center
            center;
        background-size: 100% 100%;
    }
    & > div {
        margin: 0 15px 10px 0;
        width: 80px;
        height: 80px;
        .pic {
            width: 100%;
            height: 100%;
        }
        position: relative;
        .del {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 2px;
            right: 2px;
        }
    }
  }
</style>
