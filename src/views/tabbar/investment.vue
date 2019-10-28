<template>
    <div>
        <div class="nav">{{$t('navbar.投资')}}</div>

        <div class="items">
            <div class="item" v-for="(item,index) in list" :key="item.id + index">
                <div class="item_top">{{item.title}}</div>
                <div class="content">
                    <div>
                        <div class="txt">{{$t("index.年利率")}}：</div>
                        <div class="num">{{item.minimumValue}}%~{{item.maximumValue}}%</div>
                    </div>
                    <div>
                        <div class="txt">{{$t("index.投资金额")}}：</div>
                        <div class="num">
                            {{item.price}}~{{item.highestPrice}}
                            <span>{{$t("index.莱文币")}}</span>
                        </div>
                    </div>
                </div>
                <router-link
                    :to="{'name':'PurchasePackage',query:{'package':item.title,id:item.id,min:item.price,max:item.highestPrice}}"
                    tag="button"
                    class="btn"
                >{{$t("index.投资")}}</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [] //分类列表
        };
    },
    mounted() {
        this.invest();
    },
    methods: {
        // 投资列表
        invest() {
            this.$post({
                module: "Investment",
                interface: 2000,
                data: {
                    categoryId: 1
                },
                success: res => {
                    console.log("投资列表", res);
                    if (res.data.code == 0) {
                        this.list = res.data.data.list;
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
    text-align: center;
    line-height: 46px;
    color: #ffffff;
    font-size: 18px;
    background-color: #0c0c0c;
}
.items {
    padding: 0 15px 15px;

    .item {
        margin-top: 20px;
        border-radius: 6px;
        padding: 0 10px;
        padding-bottom: 24px;

        &:nth-child(1) {
            background: linear-gradient(
                137deg,
                rgba(233, 215, 177, 1) 0%,
                rgba(200, 168, 113, 1) 100%
            );
        }
        &:nth-child(2) {
            background: linear-gradient(
                137deg,
                rgba(241, 241, 241, 1) 0%,
                rgba(188, 188, 188, 1) 100%
            );
        }
        &:nth-child(3) {
            background: linear-gradient(
                137deg,
                rgba(245, 215, 203, 1) 0%,
                rgba(245, 154, 132, 1) 100%
            );
        }

        .item_top {
            width: fit-content;
            transform: translateY(-9px);
            margin: 0 auto;
            padding: 15px 47px;
            background-image: url(../../assets/img/bg.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            text-align: center;
            color: #705827;
            font-size: 24px;
        }

        .content {
            display: flex;
            justify-content: space-around;

            & > div {
                font-weight: 1000;
                .txt {
                    color: #705827;
                    font-size: 13px;
                }

                .num {
                    font-size: 24px;
                    color: #ec5218;
                    margin: 10px 0;
                    span {
                        font-size: 13px;
                    }
                }
                &:last-child {
                    margin-left: 20px;
                    .num {
                        color: #705827;
                    }
                }
            }
        }

        .btn {
            width: calc(100% - 106px);
            margin: 10px 53px 0;
            color: #fff;
            font-size: 13px;
            background: linear-gradient(
                137deg,
                rgba(246, 180, 109, 1) 0%,
                rgba(236, 128, 24, 1) 100%
            );
            padding: 8px 0;
            box-shadow: 0px 5px 5px rgba(185, 93, 3, 0.3);
            border-radius: 18px;
        }
    }
}
</style>
