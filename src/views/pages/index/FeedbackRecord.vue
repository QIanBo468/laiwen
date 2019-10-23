<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('index.反馈记录')}}</span>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLound"
            :offset="0"
        >
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="ask">
                    <div class="icon">{{$t('index.问')}}</div>
                    <div class="content">
                        <div class="title">
                            <span>{{item.content}}</span>
                        </div>
                        <div v-for="(items,indexs) in item.imageList" :key="indexs" class="pic">
                            <img :src="items" alt />
                        </div>
                        <div class="time">{{item.createdAt}}</div>
                    </div>
                </div>
                <div class="answer" v-if="item.reply != ''">
                    <div class="content">
                        <div class="title">
                            <span>{{item.reply}}</span>
                        </div>
                        <div class="time">{{item.repliedAt}}</div>
                    </div>
                    <div class="icon">{{$t('index.答')}}</div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1, //当前页
            lastId: 0, //最新id
            list: [], //列表
            loading: false,
            finished: false
        };
    },
    methods: {
        onLound() {
            this.$post({
                module: "Content",
                interface: 5000,
                data: {
                    lastId: this.lastId,
                    page: this.currentPage
                },
                success: res => {
                    console.log("反馈列表", res);
                    if (res.data.code == 0) {
                        this.lastId = res.data.data.lastId;
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
                        this.loading = false;
                        this.finished = true;
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

.item {
    border-radius: 6px;
    background-color: #281a00;
    margin: 10px 20px;

    .ask {
        padding: 10px;
        display: flex;

        .icon {
            padding: 2px 5px;
            background-color: #1890ff;
            color: #000;
            border-radius: 50px;
            line-height: 20px;
            height: fit-content;
            text-align: center;
            font-size: 14px;
            margin-right: 10px;
        }
        .content {
            .title {
                span {
                    color: #ffffff;
                    font-size: 14px;
                }
            }
            .time {
                color: #a1937d;
            }
            .pic {
                display: flex;
                flex-wrap: wrap;
                & > img {
                    width: 70px;
                    height: 70px;
                    margin: 0 20px 10px 0;
                }
            }
        }
    }

    .answer {
        @extend .ask;
        display: flex;
        justify-content: flex-end;

        .icon {
            background-color: #f84d4d;
            margin-left: 10px;
            margin-right: 0;
        }
        .content {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }
}
</style>