<template>
    <div>
        <div class="nav">{{$t('navbar.我的')}}</div>
        <router-link to="user_list" class="user_data">
            <div class="img">
                <img :src="userInfo.avatar" alt />
                <div class="type" v-if="userInfo.icon != ''">{{userInfo.icon}}</div>
            </div>
            <div class="user_txt">
                <div class="title">
                    <span>{{userInfo.nickname}}</span>
                    <div class="tag">{{userInfo.level}}</div>
                </div>
                <div class="content">ID:{{userInfo.account}}</div>
            </div>
            <img src="@/assets/img/more_small.png" alt />
        </router-link>
        <div class="nav_box">
            <router-link to="registerIn" class="nav_list">
                <img src="@/assets/img/vip.png" alt />
                <p>{{$t('my.注册会员')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="Invitation" class="nav_list">
                <img src="@/assets/img/yaoqing@2x.png" alt />
                <p>{{$t('my.邀请好友')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="InvestmentRecord" class="nav_list">
                <img src="@/assets/img/touzi@2x.png" alt />
                <p>{{$t('my.我的投资')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="payment" class="nav_list">
                <img src="@/assets/img/shoukuan@2x.png" alt />
                <p>{{$t('my.收款方式')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="My-investment" class="nav_list">
                <img src="@/assets/img/futou@2x.png" alt />
                <p>{{$t('my.我的复投')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="my_team" class="nav_list">
                <img src="@/assets/img/wodetuandui@2x.png" alt />
                <p>{{$t('my.我的团队')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="address_book" class="nav_list">
                <img src="@/assets/img/dizhi@2x.png" alt />
                <p>{{$t('my.地址簿')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
            <router-link to="account" class="nav_list">
                <img src="@/assets/img/zhanghuyuanquan@2x.png" alt />
                <p>{{$t('my.账号安全')}}</p>
                <p style="justify-content: flex-end;padding:2px;" v-if="userInfo.mobile == ''">
                    <span></span>
                    {{$t('my.暂未绑定手机')}}
                </p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
        </div>
        <div class="nav_box">
            <router-link to class="nav_list" @click.native="quit()">
                <img src="@/assets/img/tuichu@2x.png" alt />
                <p>{{$t('my.退出登录')}}</p>
                <img src="@/assets/img/more_small.png" alt />
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo:{
                account: "",
                avatar: "",
                icon: "",
                id: 0,
                level: "",
                mobile: "*",
                nickname: ""
            }
        };
    },
    mounted() {
        this.user();
    },
    methods: {
        // 用户基本信息
        user(){
            this.$post({
                module: "User",
                interface: 1000,
                success: res => {
                    console.log("用户基本信息", res);
                    if (res.data.code == 0) {
                        this.userInfo = res.data.data;
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
        // 退出登录
        quit() {
            this.$post({
                module: "Account",
                interface: 2000,
                success: res => {
                    console.log("退出登录成功", res);
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                    if (res.data.code == 0) {
                        localStorage.removeItem("Bearer");
                        this.$router.replace("login");
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
.user_data {
    display: flex;
    align-items: center;
    color: #fff;

    .img {
        width: 55px;
        height: 55px;
        overflow: hidden;
        margin: 15px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50px;
        }
        .type {
            transform: translateY(-100%);
            background: linear-gradient(
                89deg,
                rgba(254, 116, 116, 1) 0%,
                rgba(253, 170, 115, 1) 100%
            );
            border-radius: 50px;
            font-size: 11px;
            text-align: center;
        }
    }

    .user_txt {
        flex: 1;
        .title {
            display: flex;
            span {
                font-size: 18px;
            }
            .tag {
                color: #705827;
                padding: 0 11px 0 24px;
                margin-left: 10px;
                background-image: url(../../assets/img/bg1.png);
                background-size: 100% 100%;
            }
        }
        .content {
            font-size: 13px;
        }
    }
    > img {
        width: 24px;
        height: 24px;
        margin-right: 15px;
    }
}
.nav_box {
    padding-top: 20px;
    .nav_list {
        display: inline-block;
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        align-items: center;
        background: #161102;
        color: #fff;
        img {
            width: 25px;
            height: 25px;
        }
        p {
            flex: 1;
            padding: 0 10px;
            text-align: left;
            color: #ffffff;
            font-size: 14px;
            display: flex;
            align-items: center;
            span {
                margin-right: 5px;
                display: inline-block;
                width: 4px;
                height: 4px;
                background: red;
                border-radius: 50%;
            }
        }
    }
}
</style>
