<template>
    <div>
        <div class="nav">
            <img src="@/assets/img/back.png" @click="$router.go(-1)" />
            <div>{{$t('index.问题反馈')}}</div>
            <router-link tag="span" to="FeedbackRecord">{{$t('index.反馈记录')}}</router-link>
        </div>

        <div class="textarea">
            <textarea
                autofocus
                :placeholder="$t('index.请输入您要反馈的内容')"
                v-model="font"
                maxlength="200"
            ></textarea>
            <div>{{fontlen}}/200</div>
        </div>

        <div class="money_type">
            <i></i>
            <span>{{$t('index.上传截图')}}</span>
        </div>

        <div class="upload">
            <div v-for="(item,index) in fileList" :key="index">
                <img :src="item" alt class="pic" />
                <img src="@/assets/img/del.png" alt class="del" @click="delimg(index)" />
            </div>
            <label for="file">
                <input
                    type="file"
                    style="display:none;"
                    @change="uploads($event)"
                    ref="front"
                    id="file"
                />
            </label>
        </div>

        <button @click="submit">{{$t('index.提交')}}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            fontlen: 0, //输入的长度
            font: "" //输入的内容
        };
    },
    watch: {
        font(val) {
            if (val.length > 200) {
                return;
            }
            this.fontlen = val.length;
        }
    },
    methods: {
        //上传图片
        uploads() {
            let file = this.$refs.front.files[0]; //获取文件详细信息
            if (file == null || file == undefined) {
                return;
            }
            let param = new FormData();
            param.append("avatar", file);
            this.uploadImg(param);
        },
        uploadImg(param) {
            this.$axios
                .post(this.httpPaths, param, {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("Bearer")
                    }
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.fileList.push(res.data.data.avatar);
                    } else {
                        this.$toast({
                            message: res.data.message,
                            duration: 1000
                        });
                    }
                });
        },
        // 删除 图片
        delimg(index) {
            this.fileList.splice(index, 1);
        },
        // 提交
        submit() {
            this.$post({
                module: "Content",
                interface: 5001,
                data: {
                    content: this.font,
                    imageList: this.fileList
                },
                success: res => {
                    console.log("提交反馈", res);
                    this.$toast({
                        duration: 1000,
                        message: res.data.message
                    });
                    if(res.data.code == 0){
                        this.fileList =[];
                        this.font = '';
                    }
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
.nav {
    height: 46px;
    background-color: #0c0c0c;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;

    img {
        width: 24px;
        height: 24px;
        margin: 0 60px;
        margin-left: 11px;
    }

    div {
        color: #ffffff;
        font-size: 18px;
        flex: 1;
        text-align: center;
    }

    span {
        font-size: 14px;
        color: #ffffff;
        padding: 0 14px;
    }
}

.textarea {
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #c7c7cc;

    textarea {
        width: 100%;
        border-radius: 4px 4px 0 0;
        background: rgba(40, 26, 0, 1);
        border: none;
        padding: 10px;

        &:-ms-input-placeholder {
            color: #ffffff;
        }
        &::-webkit-input-placeholder {
            color: #ffffff;
        }
        &:-moz-placeholder {
            color: #ffffff;
        }
        &::-moz-placeholder {
            color: #ffffff;
        }
    }

    div {
        width: 100%;
        text-align: end;
        padding: 0 10px;
        font-size: 12px;
        border-radius: 0 0 4px 4px;
        background: rgba(40, 26, 0, 1);
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
}
.upload {
    padding: 7px 15px;
    display: flex;
    flex-wrap: wrap;
    label {
        width: 80px;
        height: 80px;
        display: block;
        background: url("../../../assets/img/tianjia.png") no-repeat center
            center;
        background-size: 100% 100%;
    }
    & > div {
        margin: 0 15px 10px 0;
        width: 80px;
        height: 80px;
        .pic {
            width: 100%;
            height: 100%;
        }
        position: relative;
        .del {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }
}
button {
    width: 92%;
    background: linear-gradient(
        137deg,
        rgba(233, 215, 177, 1) 0%,
        rgba(200, 168, 113, 1) 100%
    );
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 200px;
    padding: 14px 0;
    font-size: 17px;
    color: #705827;
}
</style>