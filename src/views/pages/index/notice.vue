<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('index.公告')}}</span>
        </div>

        <div class="title">{{list.title}}</div>
        <div class="time">
            <span>{{list.time}}</span>
        </div>
        <div class="content" v-html="list.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list:[],
        };
    },
    mounted() {
        this.$post({
            module: "Content",
            interface: 3001,
            data:{
              id:this.$route.query.id
            },
            success: res => {
                console.log("获取公告详情", res);
                if (res.data.code == 0) {
                    this.list = res.data.data;
                } else {
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                }
            }
        });
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
.title {
    font-size: 15px;
    color: #ffffff;
    text-align: center;
    margin: 20px 0 0;
}
.time {
    text-align: end;
    font-size: 12px;
    color: #c7c7cc;
    margin: 5px 17px;
}
.content {
    font-size: 14px;
    color: #fff;
    padding: 0 26px;
    text-indent: 2em;
}
</style>