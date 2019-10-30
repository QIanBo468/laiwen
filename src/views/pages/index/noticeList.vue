<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('index.公告')}}</span>
        </div>

        <translate position="top">
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="$t('my.已全部加载完毕')"
                @load="getIncome"
                :offset="0"
            >
                <div class="item" v-for="(item,index) in list" :key="index" @click="route(item.id)">
                    <div class="text">
                        <div>{{item.title}}</div>
                        <div>{{item.createdAt}}</div>
                    </div>
                    <img src="@/assets/img/gonggao_more.png" />
                </div>
            </van-list>
        </translate>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1, //当前页
            lastId: 0, //最新id
            list: [], //公告列表
            loading: false,
            finished: false
        };
    },
    methods: {
        //获取我的收益
        getIncome() {
            this.$post({
                module: "Content",
                interface: 3000,
                data: {
                    lastId: this.lastId,
                    page: this.currentPage
                },
                success: res => {
                    console.log("公告列表", res);
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
        },
        // 跳转详情
        route(id){
          this.$router.push({'name':'notice',query:{'id':id}});
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #281a00;
    margin-top: 10px;
    padding: 11px 26px;

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

    img {
        width: 22px;
        height: 22px;
    }
}
</style>