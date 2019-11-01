<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <span>{{$t('index.公司简介')}}</span>
        </div>
        <!-- <div class="banner">
            <img src="@/assets/img/about_us_wish_content1.png" alt />
        </div> -->
        <div class="content" v-html="content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          content:'',
        };
    },
    mounted() {
        this.onlond();
    },
    methods: {
        onlond() {
            this.$post({
                module: "Content",
                interface: 4003,
                data:{
                  name:'contact_us'
                },
                success: res => {
                    console.log("获取轮播图", res);
                    if (res.data.code == 0) {
                        this.content = res.data.data.content;
                    } else {
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
        border-radius: 6px;
    }
    span {
        color: #ffffff;
        font-size: 18px;
        flex: 1;
        text-align: center;
    }
}
.banner {
    padding: 11px 15px 17px;
    img {
        width: 100%;
    }
}
.content {
    font-size: 14px;
    color: #fff;
    padding: 0 15px;
    /deep/img{
        width:100%;
        height: auto;
    }
}
</style>