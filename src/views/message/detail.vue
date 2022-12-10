<template>
    <div id="detail">
        <el-card>
            <div>id：{{ data.message.id }}</div>
            <div>姓名：{{ data.message.name }}</div>
            <div>性别：{{ data.message.sex }}</div>
            <div>电话：{{ data.message.phone }}</div>
            <div>邮箱：{{ data.message.email }}</div>
            <div>地址：{{ data.message.address }}</div>
            <div id="img">
                <img :src="data.photo" />
                <div>
                    <el-upload limit="1" action="/api/user/upload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <el-button type="primary">上传照片</el-button>
                    </el-upload>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { Upload } from "@element-plus/icons-vue";
import axios from "axios";
import { reactive, onMounted, inject } from "vue";
import store from '../../store/index.js';

const message = store.state.message;

const data = reactive({
    card3d: {},
    message: {},
    photo: ''
})
onMounted(() => {
    data.message = store.state.message;
    //data.card3d = new Card3d('#detail',message);
    if (data.message.photo)
        data.photo = data.message.photo
    else if (sessionStorage.getItem('image')) {
        data.photo = sessionStorage.getItem('image')
    }
    else {
        data.photo = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }
})
const handleAvatarSuccess = (res, file) => {
    console.log(res)
    if (res.data[0].isOK === true) {
        let url = res.data[0].imgName;
        url = 'http://10.3.81.111:5173/public/image/' + url;
        data.photo = url;
        if (store.state.userInfo.role == 'student') {
            axios.post('/api/user/editStudents', {
                s_id: store.state.userInfo.username,
                photo: data.photo

            }).then(res => {
                if (res.status === 200) {
                    sessionStorage.setItem('image', data.photo);
                    alert('上传成功');
                }
            })
        }
        else{
            axios.post('/api/user/editTeachers', {
                t_id: store.state.userInfo.username,
                photo: data.photo

            }).then(res => {
                if (res.status === 200) {
                    sessionStorage.setItem('image', data.photo);
                    alert('上传成功');
                }
            })
        }

    }

}
const beforeAvatarUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    let index = file.name.lastIndexOf(".");
    let extension = file.name.substr(index + 1);
    let extensionList = [
        "png",
        "PNG",
        "jpg",
        "JPG",
        "jpeg",
        "JPEG",
        "bmp",
        "BMP",
    ];
    if (extensionList.indexOf(extension) < 0) {
        ElMessage.error('上传头像图片格式错误!');
    }
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
}
</script>

<style lang="less" scoped>
#detail {
    width: 100%;
    height: 100vh;
    color: white;
    font-size: 30px;

    background-color: black;

    .el-card {
        position: relative;
        top: 10px;
        left: 300px;
        width: 600px;
        height: 400px;
        border: 5px solid rgb(42, 42, 174);

        div {
            padding: 5px;
        }
    }

    #img {
        position: relative;
        top: -250px;
        left: 69%;

        img {
            width: 180px;
            height: 200px;
        }
    }
}
</style>