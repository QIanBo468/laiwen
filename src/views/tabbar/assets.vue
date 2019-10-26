<template>
    <div>
        <div class="nav">{{$t('navbar.资产')}}</div>

        <div class="padding_box">
            <div class="item">
                <div class="title">
                    <i></i>
                    <span>{{$t('assets.我的钱包地址')}}</span>
                </div>
                <div class="input">
                    <input type="text" readonly v-model="purse" />
                    <button
                        v-clipboard:copy="purse"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    >{{$t('assets.复制')}}</button>
                </div>
            </div>

            <div>
                <div v-for="(item,index) in list" :key="index" @click="route(item.name)">
                    <translate position="top" time="0.4s" class="option" :class="index | bgcolor">
                        <img src="@/assets/img/yitai.png" v-if="item.name == '余额'"/>
                        <img src="@/assets/img/usdt.png" v-else-if="item.name == 'USDT'"/>
                        <img src="@/assets/img/laiwen.png" v-else/>
                        <div class="text">
                            <!-- <div>{{$t('assets.以太坊')}}</div> -->
                            <div>{{item.name}}</div>
                            <div>{{item.value}}</div>
                        </div>
                        <img src="@/assets/img/in.png" alt />
                    </translate>
                </div>

                <!-- <router-link to="USDT">
                    <translate position="top" time="0.5s" class="option two_item">
                        <img src="@/assets/img/usdt.png" />
                        <div class="text">
                            <div>USDT</div>
                            <div>{{list[2].value}}</div>
                        </div>
                        <img src="@/assets/img/in.png" alt />
                    </translate>
                </router-link>

                <router-link to="Levincoin">
                    <translate position="top" time="0.6s" class="option three_item">
                        <img src="@/assets/img/laiwen.png" />
                        <div class="text">
                            <div>{{$t('assets.莱文币')}}</div>
                            <div>843.12</div>
                        </div>
                        <img src="@/assets/img/in.png" alt />
                    </translate>
                </router-link>-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [], //商品余额
            purse: "2df4fdar4d4" //钱包地址
        };
    },
    mounted() {
        this.assets();
    },
    filters: {
        bgcolor(val) {
            switch (val) {
                case 0:
                    return "one_item";
                    break;
                case 1:
                    return "three_item";
                    break;
                case 2:
                    return "two_item";
                    break;
            }
        }
    },
    methods: {
        // 获取资产信息
        assets() {
            this.$post({
                module: "Finance",
                interface: 2003,
                success: res => {
                    console.log("资产信息", res);
                    if (res.data.code == 0) {
                        this.list = res.data.data.list;
                    }
                }
            });
        },
        // 跳转页面
        route(name) {
            if (name == '余额') {
                this.$router.push("Levincoin");
            } else if (name == 'ETH') {
                this.$router.push("Ethereum");
            } else {
                this.$router.push("USDT");
            }
        },
        //复制成功
        onCopy() {
            this.$toast({
                duration: 1000,
                message: this.$t('assets.复制成功')
            });
        },
        // 复制失败
        onError(){
          this.$toast({
                duration: 1000,
                message: this.$t('assets.复制失败')
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.nav {
    height: 46px;
    text-align: center;
    line-height: 46px;
    color: #ffffff;
    font-size: 18px;
    background-color: #0c0c0c;
}
.padding_box {
    padding: 13px 16px;
    .item {
        overflow: hidden;
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
    .option {
        display: flex;
        border-radius: 6px;
        align-items: center;
        margin: 15px 0;

        img {
            &:first-child {
                width: 50px;
                height: 50px;
                margin: 30px 20px;
            }
            &:last-child {
                width: 19px;
                height: 19px;
                margin-right: 24px;
            }
        }

        .text {
            flex: 1;
            margin-right: 24px;
            overflow: auto;

            div {
                margin: 10px 0;

                &:first-child {
                    color: #fff7de;
                    font-size: 16px;
                }
                &:last-child {
                    color: #fff;
                    font-size: 28px;
                }
            }
        }

        .one_item {
            background: linear-gradient(
                89deg,
                rgba(74, 102, 250, 1) 0%,
                rgba(116, 130, 252, 1) 100%
            );
        }
        .two_item {
            background: linear-gradient(
                89deg,
                rgba(129, 94, 253, 1) 0%,
                rgba(183, 117, 255, 1) 100%
            );
        }
        .three_item {
            background: linear-gradient(
                89deg,
                rgba(254, 116, 116, 1) 0%,
                rgba(253, 170, 115, 1) 100%
            );
        }
    }
    .one_item {
        background: linear-gradient(
            89deg,
            rgba(74, 102, 250, 1) 0%,
            rgba(116, 130, 252, 1) 100%
        );
    }
    .two_item {
        background: linear-gradient(
            89deg,
            rgba(129, 94, 253, 1) 0%,
            rgba(183, 117, 255, 1) 100%
        );
    }
    .three_item {
        background: linear-gradient(
            89deg,
            rgba(254, 116, 116, 1) 0%,
            rgba(253, 170, 115, 1) 100%
        );
    }
}
</style>
