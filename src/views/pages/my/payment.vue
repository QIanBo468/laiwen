<template>
  <div>
    <div class="nav">
      <span style="text-align: left;"><img src="@/assets/img/back.png"
             @click="$router.go(-1)" /></span>
      <p>{{$t('my.我的收款方式')}}</p>
      <span style="text-align: right;"
            @click="nav_link">{{$t('my.添加')}}</span>
    </div>
    <div class="img_box"
         v-if="is_show">
      <img src="@/assets/img/kong@2x.png"
           alt="">
      <p>{{$t('my.暂无收款方式')}}</p>
    </div>
    <div class="list_box" v-if="!is_show">
      <div v-for="(item,index) in list" @click="edit_payment(item.id)" :key="index">

        <img v-if="item.cardType == 3" src="@/assets/img/bank@2x.png" alt="">
        <img v-else :src="item.logo" alt="">
        <div>
          <div>
            <p v-if="item.cardType == 3">{{item.bankCode}}</p>
            <p v-else>{{item.cardTypeCn}}</p>
            <div @click.stop="1">
            <van-switch v-if="item.cardType == 3" class="switch_btn" size="22px"
                        active-color="#A1937D"
                        inactive-color="#281a00"
                        :value="item.state==1?true:false"
                        @change="onInput(item.id, item.state)" />
            </div>
          </div>
          <div>
            <p>{{$t('my.账户名称')}}：{{item.owner}}</p>
            <button v-if="item.cardType == 3" class="remove_btn" @click.stop="remove(index,item.id)">删除</button>
          </div>
          <p>{{$t('my.账号')}}：{{item.cardNo}}</p>
          <p  v-if="item.cardType == 3">{{$t('my.开户行')}}：{{item.bankSubbranch}}</p>
        </div>
      </div>
      <!-- <div>
        <img src="@/assets/img/bank@2x.png"
             alt="">
        <div>
          <div>
            <p>支付宝支付</p>
          </div>
          <p>{{$t('my.账户名称')}}：韩梅梅</p>
          <p>{{$t('my.账号')}}：188 1234 5678</p>
        </div>
      </div>
      <div>
        <img src="@/assets/img/bank@2x.png"
             alt="">
        <div>
          <div>
            <p>中国工商银行支付</p>
            <van-switch class="switch_btn" size="22px"
                        active-color="#A1937D"
                        inactive-color="#281a00"
                        :value="checked"
                        @change="onInput" />
          </div>
          <p>{{$t('my.账户名称')}}：韩梅梅</p>
          <p>{{$t('my.账号')}}：188 1234 5678</p>
          <p>{{$t('my.开户行')}}：兰山区北京路分行</p>
        </div>
      </div>
      <div>
        <img src="@/assets/img/bank@2x.png"
             alt="">
        <div>
          <div>
            <p>中国工商银行支付</p>
            <van-switch class="switch_btn" active-color="#A1937D"
                        inactive-color="#281a00"
                        size="22px"
                        :value="checked"
                        @change="onInput" />
          </div>
          <p>{{$t('my.账户名称')}}：韩梅梅</p>
          <p>{{$t('my.账号')}}：188 1234 5678</p>
          <p>{{$t('my.开户行')}}：兰山区北京路分行</p>
        </div>
      </div> -->
    </div>
    <div v-if="is_add" class="back_add">
      <div class="box">
        <p>{{$t('my.选择收款方式')}}</p>
        <div @click="is_ho=1">
          <p>{{$t('my.支付宝')}}</p>
          <img src="@/assets/img/xuanze@2x.png"
               v-if="is_ho==1">
        </div>
        <div @click="is_ho=2">
          <p>{{$t('my.微信')}}</p>
          <img src="@/assets/img/xuanze@2x.png"
               v-if="is_ho==2">
        </div>
        <div @click="is_ho=3">
          <p>{{$t('my.银行卡')}}</p>
          <img src="@/assets/img/xuanze@2x.png"
               v-if="is_ho==3">
        </div>
        <button class="btn"
                @click="routlink">{{$t('my.添加')}}</button>
        <p style="color:#FFF7DE;padding-top:10px;"
           @click="is_add=false;">{{$t('my.取消')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked: true,
      is_show: false,
      is_add: false,
      is_ho: 1,
      list:[]
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    edit_payment(id){

      this.$router.push({path:'/edit_payment','query':{'id':id}})
    },
    remove(index,id){

      this.$post({
          module: "Finance",
          interface: 1002,
          data: {
            id:id
          },
          success: res => {
              if (res.data.code == 0) {
                this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
                this.list.splice(index)
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
    nav_link () {
      this.is_add = true;
    },
    routlink () {
      if (this.is_ho == 3) {
        this.$router.push({ name: 'add_payment', query: { type: 3 } })
      }
      else if(this.is_ho == 2){
        this.$router.push({ name: 'add_payment', query: { type: 2 } })
      } 
      else {
        this.$router.push({ name: 'add_payment', query: { type: 1 } })
      }

    },
    onInput (id,state) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否切换开关？'
      }).then(() => {
        state  = state==1?0:1;

        this.$post({
          module: "Finance",
          interface: 1003,
          data: {
            id:id,
            state:state
          },
          success: res => {
              if (res.data.code == 0) {
                var list = this.list
                for (var i = list.length - 1; i >= 0; i--) {
                  if(list[i]['id'] == id){
                    list[i]['state'] = state;
                  }
                }
                this.list = list
              }
              else{
                  this.$toast({
                      duration: 1000,
                      message: res.data.message
                  });
              }
          }
        });

      }).catch(() => {
        // on cancel
      });
    },
    //获取数据
    getData(){
      this.$post({
          module: "Finance",
          interface: 1000,
          data: {
          },
          success: res => {
              if (res.data.code == 0) {
                if(res.data.data.list.length == 0){
                  this.is_show=true
                }
                this.list = res.data.data.list
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
  .switch_btn{
    border:2px solid #A1937D;
  }
  .remove_btn{
    width:48px;
    height:24px;
    line-height: 24px;
    background:linear-gradient(137deg,rgba(246,180,109,1) 0%,rgba(236,128,24,1) 100%);
    opacity:1;
    border-radius:36px;
    font-weight:400;
    color:#fff;
  }
  .nav {
    height: 46px;
    background-color: #0c0c0c;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    span {
      display: inline-block;
      width: 20%;
      color: #ffffff;
      font-size: 18px;
      img {
        width: 24px;
        height: 24px;
      }
    }
    p {
      color: #ffffff;
      font-size: 18px;
      flex: 1;
      text-align: center;
    }
  }
  .img_box {
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      width: 161px;
      height: 138px;
    }
    p {
      width: 100%;
      color: #fff7de;
      font-size: 16px;
      padding: 10px 0;
      text-align: center;
    }
  }
  .list_box {
    width: 90%;
    margin: 0 auto;
    padding: 0 15px 15px 15px;
    background: #281a00;
    border-radius: 6px;
    margin-top: 10px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #4a3300;
      img {
        width: 90px;
        height: 90px;
        margin-right: 10px;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        > div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          p {
            color: #ffffff;
            font-size: 16px;
          }
        }
        > p {
          color: #fff7de;
          font-size: 14px;
        }
      }
    }
    & > div:last-child {
      border-bottom: none;
    }
  }
  .back_add {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .box {
      width: 80%;
      padding: 20px;
      background: linear-gradient(
        137deg,
        rgba(233, 215, 177, 1) 0%,
        rgba(200, 168, 113, 1) 100%
      );
      border-radius: 6px;
      > p {
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #705827;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #a1937d;
        padding: 20px 0;
        p {
          font-size: 16px;
          color: #705827;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
      .btn {
        margin-top: 20px;
        width: 100%;
        padding: 10px 0;
        background: rgba(255, 247, 222, 1);
        border-radius: 20px;
        font-size:15px;
      }

    }
  }
</style>
