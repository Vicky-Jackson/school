<template>
    <div id="sign_detail">
        <!-- <div v-if="data.empty == true">
            <em>还无人上交作业</em>
        </div> -->
        <div  id="work" style="padding:10px;">
            <el-space wrap>
                <el-card v-for="item in msg" :key="item" class="box-card" @click="clickItem(item)">
                    <span>{{ item.s_name }}</span>
                    <span>{{ item.time }}</span>
                </el-card>
            </el-space>
            <el-dialog v-model="dialogFormVisible" title="作业详情" width="50%">
                <div v-html="data.click.detail">
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import store from '../../store/index'
import { onMounted, reactive, ref } from 'vue'

const msg = ref(store.state.workStudent);
const currentDate = ref(new Date())
const dialogFormVisible = ref(false);
const data = reactive({
    empty: false,
    click:{}
})
onMounted(() => {
    
})
const clickItem = (item) =>{
    data.click=item;
    dialogFormVisible.value = true
}
</script>

<style lang="less" scoped>
#sign_detail {
    width: 100%;
    min-height: 100vh;
    background-color: black;
}

em {
    color: rgb(109, 67, 67);
    font-size: 32px;

}
#work{
    cursor: pointer;
}
</style>