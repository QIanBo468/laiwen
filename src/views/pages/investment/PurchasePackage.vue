<template>
    <div class="forgetPwd">
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('investment.购买套餐')}}</span>
        </div>

        <div class="items">
            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('investment.套餐类型')}}</span>
                </div>
                <div class="input">
                    <input type="text" v-model="packages" readonly />
                </div>
            </div>
            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('investment.金额')}}</span>
                </div>
                <div class="input">
                    <span>￥</span>
                    <input type="number" :placeholder="placeholders" v-model="amount" />
                </div>
            </div>

            <button class="save_login" @click="investmentFun">{{$t('investment.提交')}}</button>

            <van-popup :style="{width: '70%'}" :close-on-click-overlay="false" v-model="isShow">
                <div class="van_body" v-show="status">
                    <div class="title">{{$t("investment.投资成功")}}！</div>
                    <div class="content">{{$t("investment.消耗莱文币")}}{{amount}}</div>
                    <button class="btn" @click="query()">{{$t('public.确定')}}</button>
                </div>
                <div class="van_body" v-show="!status">
                    <div class="title">{{$t("investment.投资失败")}}！</div>
                    <div class="content">{{$t("investment.莱文币不足")}}</div>
                    <button class="btn" @click="isShow=false">{{$t('public.取消')}}</button>
                    <div
                        class="recharge"
                        @click="$router.push('FillMoney')"
                    >{{$t("investment.立即充值")}}</div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            packages: this.$route.query.package, //套餐标题
            id: this.$route.query.id, //套餐 id
            isShow: false,
            amount: "", //投资钱数
            status: false,
            placeholders: "" //金额提示
        };
    },
    mounted() {
        
        // 获取中英文切换状态
        let cutover = localStorage.getItem("lang");
        let tit;
        if (cutover == "en") {
            tit = 'item  C'
        } else {
             tit = 'C套餐'
        }
        let max;
        if (this.packages != tit || this.packages != tit) {
            max = this.$route.query.max;
        }else{
            max = '';
        }
        if (cutover == "zh") {
            this.placeholders =
                this.$t("investment.请输入金额") +
                this.$route.query.min +
                "~" +
                max;
        } else {
            this.placeholders =
                this.$t("investment.请输入金额") +
                "(" +
                this.$route.query.min +
                "~" +
                max +
                ")";
        }
    },
    methods: {
        
        // 提交
        investmentFun() {
            let cutover = localStorage.getItem("lang");
            let tit;
            if (cutover == "en") {
                tit = 'item  C'
            } else {
                tit = 'C套餐'
            }
            
            if (this.packages != tit) {
                if (
                    this.amount < this.$route.query.min - 1 ||
                    this.amount > this.$route.query.max ||
                    this.amount % 100 != 0
                ) {
                    this.$toast({
                        duration: 1500,
                        message: this.placeholders
                    });
                    return;
                }
            }else{
                if (
                    this.amount < this.$route.query.min - 1 ||
                    this.amount % 100 != 0
                ) {

                    this.$toast({
                        duration: 1500,
                        message: this.placeholders
                    });
                    return;
                } 
            }
            this.$post({
                module: "Investment",
                interface: 3000,
                data: {
                    id: this.id,
                    amount: this.amount,
                    type: 0
                },
                success: res => {
                    this.isShow = true;
                    console.log("购买套餐", res);
                    if (res.data.code == 0) {
                        this.status = true;
                    } else {
                        this.status = false;
                    }
                }
            });
        },
        query() {
            this.isShow = false;
            this.$router.push("investmentRecord");
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

        .input {
            display: flex;
            justify-content: space-between;
            padding: 13px 20px;
            margin-bottom: 14px;
            border-radius: 6px;
            background-color: #281a00;
            span {
                color: #ffffff;
                font-size: 16px;
            }

            input {
                flex: 1;
                width: 0;
                background-color: transparent;
                outline: none;
                border: none;
                font-size: 16px;
                color: #ffffff;
            }

            button {
                background: linear-gradient(
                    137deg,
                    rgba(246, 180, 109, 1) 0%,
                    rgba(236, 128, 24, 1) 100%
                );
                font-size: 13px;
                box-shadow: 0px 5px 5px rgba(185, 93, 3, 0.3);
                opacity: 1;
                border-radius: 18px;
                color: #ffffff;
                margin-left: 20px;
                padding: 2px 15px;
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
        margin-top: 150px;
    }
}

/deep/ .van-popup {
    background-color: transparent;
}
.van_body {
    background: linear-gradient(
        137deg,
        rgba(233, 215, 177, 1) 0%,
        rgba(200, 168, 113, 1) 100%
    );
    padding: 28px 20px 20px;
    border-radius: 6px;
    text-align: center;

    .title {
        color: #705827;
        font-size: 18px;
        font-weight: bold;
    }
    .content {
        color: #705827;
        font-size: 15px;
        margin-top: 10px;
    }
    .btn {
        color: #705827;
        background-color: #fff7de;
        border-radius: 50px;
        width: 100%;
        font-size: 15px;
        margin-top: 30px;
        padding: 5px 0;
    }
    .recharge {
        color: #fff;
        width: fit-content;
        margin: 0 auto;
        padding: 0 5px;
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>