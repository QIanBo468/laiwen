<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('assets.我的银行卡')}}</span>
        </div>

        <div class="items">
            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('assets.选择银行卡')}}</span>
                </div>
                <van-radio-group v-model="radio" checked-color="#C8A871">
                    <div class="card" v-for="(item,index) in list" :key="index">
                        <img src="@/assets/img/bank.png" alt v-if="item.cardType == 3" />
                        <img :src="item.logo" alt v-else />
                        <div class="content">
                            <div class="content_title" v-if="item.cardType == 3">{{item.bankCode}}</div>
                            <div class="content_title" v-else>{{item.cardTypeCn}}支付</div>
                            <div class="content_data">
                                <span>{{$t("assets.账户名称")}}：</span>
                                <span>{{item.owner}}</span>
                            </div>
                            <div class="content_data">
                                <span>{{$t("assets.账号")}}：</span>
                                <span>{{item.cardNo}}</span>
                            </div>
                            <div class="content_data" v-if="item.cardType == 3">
                                <span>{{$t("assets.开户行")}}：</span>
                                <span>{{item.bankSubbranch}}</span>
                            </div>
                        </div>
                        <van-radio :name="item.id"></van-radio>
                    </div>
                </van-radio-group>

                <button class="save_login" @click="bank()">{{$t("public.确定")}}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return { radio: '', list: [] };
    },
    mounted() {
        this.radio =Number(sessionStorage.getItem("radio"));
        
        //获取银行卡数据
        this.$post({
            module: "Finance",
            interface: 4003,
            success: res => {
                console.log("银行卡列表", res);
                if (res.data.code == 0) {
                    this.list = res.data.data.Bank;
                }
            }
        });
    },
    watch:{
      radio(val){
        sessionStorage.setItem("radio", this.radio);
        this.list.forEach(item=>{
            if(item.id == val){
                sessionStorage.setItem("card", item.id);
            }
        })
      }
    },
    methods: {
        bank() {
            this.$router.replace({ name: "withdraw"});
            this.$router.go(-1);
        }
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
.items {
    padding: 13px 16px;

    .item {
        .title {
            color: #ffffff;
            font-size: 16px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;

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
        .card {
            display: flex;
            align-items: center;
            background-color: #281a00;
            border-radius: 6px;
            padding: 15px 14px;
            margin-bottom: 15px;

            img {
                width: 90px;
            }

            .content {
                flex: 1;
                margin: 0 15px;
                overflow: auto;

                .content_title {
                    font-size: 16px;
                    color: #ffffff;
                    margin-bottom: 10px;
                }
                .content_data {
                    font-size: 14px;
                    color: #fff7de;
                }
            }
        }
        .save_login {
            width: 100%;
            color: #705827;
            font-size: 17px;
            padding: 11px 0;
            background: linear-gradient(
                137deg,
                rgba(233, 215, 177, 1) 0%,
                rgba(200, 168, 113, 1) 100%
            );
            opacity: 1;
            border-radius: 6px;
            margin-top: 50px;
        }
    }
}
</style>