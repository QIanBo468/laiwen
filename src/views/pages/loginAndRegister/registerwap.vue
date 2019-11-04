<template>
    <div class="register">
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <div class="qh">
            <van-switch v-model="checked1"
                  size="20px"
                  active-color="#D5AB64"
                  inactive-color="#0C0C0C"
                  @change="localchange" />
            <p>{{localStorage}}</p>
            </div>
        </div>

        <div class="title">{{$t('login.注册')}}</div>
        <div class="go_login">
            {{$t('login.返回登录')}}
            <router-link to="login" class="animate">{{$t('login.登录')}}</router-link>
        </div>

        <div class="input_box">
            <div class="item">
                <img src="@/assets/img/youxiang.png" />
                <input type="email" :placeholder="$t('login.请输入邮箱')" v-model="account" />
            </div>

            <div class="item">
                <img src="@/assets/img/jihuoma.png" />
                <div class="code">
                    <input type="text" :placeholder="$t('login.请输入验证码')" v-model="captcha" />
                    <button @click="code">{{show == true?$t('login.获取验证码'):time+'S'}}</button>
                </div>
            </div>

            <div class="item">
                <img src="@/assets/img/mima.png" />
                <input type="password" :placeholder="$t('login.请输入密码')" v-model="password" />
            </div>

            <div class="item">
                <img src="@/assets/img/mima.png" />
                <input type="password" :placeholder="$t('login.二次输入密码')" v-model="passwords" />
            </div>

            <div class="item">
                <img src="@/assets/img/mima.png" />
                <input type="password" :placeholder="$t('login.请设置二级密码')" v-model="safeword" />
            </div>

            <div class="item">
                <img src="@/assets/img/mima.png" />
                <input type="password" :placeholder="$t('login.确认二级密码')" v-model="safewords" />
            </div>

            <div class="item">
                <img src="@/assets/img/youxiang.png" />
                <input type="email" :placeholder="$t('login.请输入推荐人邮箱')" v-model="recommend" readonly="true" />
            </div>

            <div class="item">
                <img src="@/assets/img/youxiang.png" />
                <input type="email" :placeholder="$t('login.请输入安置人邮箱')" v-model="place" />
            </div>
        </div>

        <button class="register_btn" @click="register">{{$t('login.注册')}}</button>

        <div class="protocol">
            <div> <van-checkbox v-model="checked" checked-color="#C8A871"></van-checkbox></div>
            <span @click="shows = true">{{$t('login.协议')}}</span>
        </div>
        <van-popup v-model="shows"  position="bottom" closeable>
            <div class="pact" v-html="xy">
                <div v-html="xy"></div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checked: true, //是否选择协议
            account: "", //登录账号
            captcha: "", //短信验证码
            password: "", //登录密码
            passwords: "", //确认登录密码
            safeword: "", //二级密码
            safewords: "", //确认二级密码
            recommend: "", //推荐人邮箱
            place: "", //安置人邮箱
            show: true, //获取验证码是否显示
            time: 60, //验证码间隔时间
            lang:'',//语言
            shows:false,
            xy:'',
            localStorage:'En'
        };
    },
    computed: {
        checked1 () {
            if (localStorage.getItem("lang") == "en") {
                this.lang = 0;
                return true
            } else {
                this.lang = 1;
                return false
            }
        }
    },
    mounted() {
        console.log(localStorage.getItem("lang"));
        if (localStorage.getItem("lang") == null) {
            localStorage.setItem("lang", "en");
        }
        this.setlanguage();
        
        this.$post({
            module: "Content",
            interface: 4005,
            data: {
                language:this.lang,
            },
            success: res => {
                console.log("用户协议", res);
                if (res.data.code == 0) {
                    this.xy = res.data.data.content;
                    console.log(this.xy);
                } else {
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                }
            }
        });
        this.recommend = this.$route.query.from;
    },
    methods: {
        setlanguage(){
            if (localStorage.getItem("lang") == "en") {
                this.lang = 0;
            } else {
                this.lang = 1;
            }
            if (localStorage.getItem("lang") == "en") this.localStorage = "En";
            else this.localStorage = "中";

            let item = document.querySelectorAll(".animate"),
              _this = this;

            for (let i = 0; i < item.length; i++) {
              item[i].addEventListener("touchstart", e => {
                _this.$_clickAnimate(
                  item[i],
                  e.touches[0].clientX,
                  e.touches[0].clientY,
                  "rgba(74, 51, 0, 0.2)"
                );
              });
            }
        },
        // 注册
        register() {
            if (this.recommend == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.推荐关系')
                });
                return;
            }
            if (this.account == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.请输入邮箱')
                });
                return;
            }
            if (this.captcha == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.请输入验证码')
                });
                return;
            }
            if (this.password == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.请输入密码')
                });
                return;
            }
            if (this.passwords == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.二次输入密码')
                });
                return;
            }
            if (this.passwords != this.password) {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.两次密码不同')
                });
                return;
            }
            if (this.safeword == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.请设置二级密码')
                });
                return;
            }
            if (this.safewords == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.确认二级密码')
                });
                return;
            }
            if (this.safewords != this.safeword) {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.确认二级密码')
                });
                return;
            }
            
            if (this.place == "") {
                this.$toast({
                    duration: 1000,
                    message: $t('login.请输入安置人邮箱')
                });
                return;
            }
            if (!this.checked) {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.同意协议')
                });
                return;
            }
            this.$post({
                module: "Account",
                interface: 1002,
                data: {
                    account: this.account,
                    captcha: this.captcha,
                    password: this.password,
                    safeword: this.safeword,
                    recommend: this.recommend,
                    place: this.place,
                    language:this.lang
                },
                success: res => {
                    console.log("注册成功", res);
                    if (res.data.code == 0) {
                        // localStorage.setItem(
                        //     "Bearer",
                        //     res.data.data.accessToken
                        // );
                        // console.log(localStorage.getItem("Bearer"));
                        this.$toast({
                            duration: 1000,
                            message: this.$t('login.注册成功')
                        });
                        //跳转到下载页
                        if(res.data.data.url  != ""){
                            window.location.href = res.data.data.url;
                        }
                        //this.$router.replace("/");
                    } else {
                        this.$toast({
                            duration: 1000,
                            message: res.data.message
                        });
                    }
                }
            });
        },
        // 获取验证码
        code(){
            if (this.account == "") {
                this.$toast({
                    duration: 1000,
                    message: this.$t('login.请输入邮箱')
                });
                return;
            }
            if (!this.show) {
                return;
            }
            this.$post({
                module: "Account",
                interface: 1001,
                data: {
                    account: this.account
                },
                success: res => {
                    console.log("获取验证码", res);
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                    if (res.data.code == 0) {
                        this.show = false;
                        let time = setInterval(() => {
                            this.time--;
                            if (this.time == 0) {
                                clearInterval(time);
                                this.time = 60;
                                this.show = true;
                            }
                        }, 1000);
                    }
                }
            });
        },
        localchange () {
          if (this.checked1) localStorage.setItem("lang", "zh");
          else localStorage.setItem("lang", "en");
          window.location.reload()
        },
    }
};
</script>
<style lang="scss" scoped>
.nav {
    height: 46px;
    background-color: #0c0c0c;
    display: flex;
    align-items: center;

    img {
        width: 24px;
        height: 24px;
        margin-left: 11px;
    }
    justify-content: space-between;
    padding: 10px 15px;
    background-color: #0c0c0c;
    p {
        font-size: 14px;
        color: #ffffff;
        margin-left: 10px;
    }
        /deep/.van-switch {
        border: 1px solid #d5ab64;
    }
    .qh{
        display:flex;
    }
}

.title {
    padding: 10px 30px;
    font-size: 24px;
    color: #ffffff;
}

.go_login {
    padding: 0px 30px;
    font-size: 14px;
    color: #ffffff;

    .animate {
        color: #ec8018;
    }
}

.input_box {
    margin-top: 30px;

    .item {
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-size: 14px;

        img {
            width: 20px;
            height: 20px;
            margin: 0 20px;
        }

        & > input {
            border: none;
            width: 0;
            outline: none;
            color: #fff7de;
            background-color: transparent;
            border-bottom: 1px solid #4a3300;
            flex: 1;
            padding: 14px 0;
        }

        .code {
            display: flex;
            flex: 1;
            align-items: center;
            border-bottom: 1px solid #4a3300;

            input {
                flex: 1;
                width: 0;
                border: none;
                outline: none;
                color: #fff7de;
                background-color: transparent;
                padding: 14px 0;
            }

            button {
                white-space: nowrap;
                margin-left: 20px;
                color: #ffffff;
                border-radius: 50px;
                border: 1px solid #ffffff;
                height: fit-content;
                padding: 2px 15px;
            }
        }
    }
}

.register_btn {
    width: calc(100% - 60px);
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
    margin: 0 30px;
    margin-top: 50px;
}

.protocol {
    display: flex;
    padding: 13px 0;
    justify-content: center;
    align-items: center;
    div{
        padding:0 10px;
    }
    span {
        display:block;
        flex: 1;
        color: #C7C7CC;
    }
}
.pact{
    width: 100%;
    min-height: 200px;
    margin-top: 35px;
}
</style>