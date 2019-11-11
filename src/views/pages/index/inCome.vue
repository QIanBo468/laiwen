<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('index.我的收益')}}</span>
        </div>

        <div class="income_box">
            <div class="income_left">
                <div>{{$t('index.静态收益总和')}}:</div>
                <div>{{staticState}}</div>
            </div>
            <div class="income_right">
                <div>{{$t('index.动态收益总和')}}:</div>
                <div>{{dynamic}}</div>
            </div>
        </div>

        <div class="type_box">
            <div class="money_type" @click="dropShow = !dropShow">
                <i></i>
                <span>{{$t('index.奖金类型')}}</span>
                <img :class="{img_up:dropShow}" src="@/assets/img/xiala.png" alt />
            </div>

            <div class="content_box" :class="{drop_show:dropShow}">
                <div class="drop_down">
                    <van-radio-group  v-model="radio" checked-color="#C8A871">
                        <div class="drop_item">
                            <span>{{$t('index.静态收益')}}</span>
                            <van-radio @click="dropShow = !dropShow,getIncome" name="1"></van-radio>
                        </div>
                        <div class="drop_item">
                            <span>{{$t('index.直推奖金')}}</span>
                            <van-radio  @click="dropShow = !dropShow,getIncome"  name="2"></van-radio>
                        </div>
                        <div class="drop_item">
                            <span>{{$t('index.管理奖金')}}</span>
                            <van-radio  @click="dropShow = !dropShow,getIncome"  name="3"></van-radio>
                        </div>
                    </van-radio-group>
                </div>
            </div>
        </div>

        <translate position="top">
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="$t('my.已全部加载完毕')"
                @load="getIncome"
                :offset="0"
            >
                <div
                    class="item"
                    :class="{item_hide:dropShow}"
                    v-for="(item,index) in list"
                    :key="index"
                >
                    <div class="text">
                        <div>{{item.remark}}</div>
                        <div>{{item.createdAt}}</div>
                    </div>
                    <span>+{{item.realMoney}}</span>
                </div>
            </van-list>
        </translate>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: "1",
            dropShow: false,
            list: [], //我的收益数据
            lastId: 0, //最新数据
            currentPage: 1, //当前页
            loading: false,
            finished: false,
            staticState:'',//静态
            dynamic:'',//动态
        };
    },
    watch: {
        radio(val) {
            this.lastId = 0;
            this.currentPage = 1;
            this.list = [];
            this.finished = false;
        }
    },
    methods: {
        //获取我的收益
        getIncome() {
            let creditTypes = "";

            if (this.radio == "1") {
                creditTypes = 'credit_6';
            } else if (this.radio == "2") {
                creditTypes = 'credit_8';
            } else if (this.radio == "3") {
                creditTypes = 'credit_7';
            }
            console.log(this.radio,creditTypes)
            this.$post({
                module: "Finance",
                interface: 2101,
                data: {
                    lastId: this.lastId,
                    page: this.currentPage,
                    creditTypes: creditTypes
                },
                success: res => {
                    console.log("获取我的收益", res);
                    if (res.data.code == 0) {
                        this.lastId = res.data.data.lastId;
                        this.dynamic = res.data.data.dynamic;
                        this.staticState = res.data.data.staticState;
                        if (res.data.data.lastPage == 1) {
                            this.list = res.data.data.list;
                            this.loading = false;
                            this.finished = true;
                        } else {
                            let list = res.data.data.list;
                            this.list = this.list.concat(list);
                            this.loading = false;
                            if (
                                res.data.data.lastPage ==
                                res.data.data.currentPage
                            ) {
                                this.finished = true;
                            }
                            this.currentPage++;
                        }
                    } else {
                        this.finished = true;
                        this.$toast({
                            duration: 1000,
                            message: res.data.message
                        });
                    }
                }
            });
        }
    },
    created() {
        // this.getIncome();
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
.income_box {
    display: flex;
    width: 92%;
    margin: 10px auto;
    color: #ffffff;

    .income_left {
        height: 100px;
        background: linear-gradient(
            137deg,
            rgba(246, 180, 109, 1) 0%,
            rgba(236, 128, 24, 1) 100%
        );
        opacity: 1;
        border-radius: 6px 0 0 6px;
        padding: 15px 14px 32px;
        transform: translateX(2px);
        flex: 1;

        div:first-child {
            font-size: 13px;
        }

        div:last-child {
            font-size: 20px;
            line-height: 40px;
        }
    }
    .income_right {
        @extend .income_left;
        border-radius: 6px;
        transform: translateX(-2px);
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

    img {
        width: 24px;
        height: 24px;
        transform: rotate(0deg);
        transition: 0.3s all;
    }

    .img_up {
        transform: rotate(180deg);
    }
}

.content_box {
    height: 0;
    opacity: 0;
    transform: scaleY(0);
    transition: 0.3s all;

    .drop_down {
        .drop_item {
            color: #ffffff;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #281a00;
            border-bottom: 1px solid rgba(67, 46, 0, 1);
            padding: 20px 26px;
        }
    }
}
.drop_show {
    opacity: 1;
    transform: scale(1);
    height: 195px;
}
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #281a00;
    transition: 0.3s all;
    padding: 11px 26px;
    border-bottom: 1px solid rgba(67, 46, 0, 1);

    .text {
        div {
            &:first-child {
                color: #ffffff;
                font-size: 14px;
            }

            &:last-child {
                color: #c7c7cc;
                font-size: 12px;
            }
        }
    }

    span {
        color: #fff;
        font-size: 16px;
    }
}
.item_hide {
    background-color: #0d0900;
    border-bottom: 1px solid #160f00;
    .text {
        div {
            &:first-child {
                color: #434241;
            }

            &:last-child {
                color: #434241;
            }
        }
    }
    span {
        color: #434241;
    }
}
</style>