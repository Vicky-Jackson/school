<template>
    <div class="hello">
        姓名<el-input v-model="name" placeholder="请输入姓名" class="w-50 m-2"></el-input>
        <br>
        年龄<el-input v-model="age" placeholder="请输入年龄" class="w-50 m-2"></el-input>
        <br>
        <el-button @click="insert">录入</el-button>
        <br>
        姓名<el-input v-model="queryname" placeholder="请输入姓名" class="w-50 m-2"></el-input> <br>
        <el-button @click="query">查询</el-button>
    </div>
</template>
 
<script>
import axios from "axios";
export default {
    data() {
        return {
            name: "",
            age: "",
            queryname: "",
        };
    },
    mounted() { },
    methods: {
        insert() {
            let name = this.name;
            let age = this.age;
            let id = 5;
            axios
                .post(
                    "/api/user/addUser",
                    {
                        id,
                        name,
                        age,
                    },
                    {}
                )
                .then((res) => {
                    if (res.status == 200) {
                        alert("录入成功")
                    }
                });
        },
        query() {
            let name = this.queryname;
            // ! 这里不能在浏览器控制台里面打印出来，但是在服务端(cmd中或者power shell)可以打印出来，可以在服务端将值保存在 vuex 中
            axios
                .post("/api/user/getUser", { name }, {})
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        this.name = res.data[0].name;
                        this.age = res.data[0].age
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
 
<style scoped>
.el-input {
    width: 30%;
    margin: 10px;
}
</style>