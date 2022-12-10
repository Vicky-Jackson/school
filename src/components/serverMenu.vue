<template>
    <div id="header">
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-button type="primary">保存数据</el-button>
        <el-button type="success" @click="exportExcel">导出</el-button>
        <div id="inputAuto">
            <el-autocomplete v-model="data.state" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
                class="inline-input" placeholder="Please Input" @select="handleSelect" :suffix-icon="Search"
                :select-when-unmatched="true">
                <template #default="{ item }">
                    <div class="value">{{ item.name || item.s_name || item.course_name || item.no}}</div>
                </template>
            </el-autocomplete>
        </div>

    </div>

    <el-table id="exportTab" :data="data.state == '' ? tableData.message : data.message" stripe style="width: 100%"
        height="450">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(o) in data.keys" :key="o" :prop="o" :label=o :sortable ="o ==='class' || o==='score'">
            <template #default="scope">
                <span v-if="o !=='photo'">{{scope.row[o]}}</span>
                <img :src=scope.row[o] v-else>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="show(scope.$index, scope.row)">
                    edit
                </el-button>
                <el-button link type="primary" size="small" @click="deleteRow(scope.$index, scope.row)">
                    Remove
                </el-button>
            </template>
        </el-table-column>
    </el-table>


    <el-dialog v-model="dialogFormVisible" title="添加">
        <el-form :model="data">
            <div v-for="item in data.keys" :key="item">
                <el-form-item :label="item" :label-width="formLabelWidth" v-if="item !== 'photo'">
                    <el-input v-model="data.result[item]" autocomplete="off" />
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onAdditem">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogForm" title="修改">
        <el-form :model="data">
            <div v-for="item in data.keys" :key="item">
                <el-form-item :label="item" :label-width="formLabelWidth" v-if="item !== 'photo'">
                    <el-input v-model="data.click[item]" autocomplete="off" :disabled="item.split('_')[1] === 'id' || item.split('_')[0]==='id'"/>
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onEdititem">
                    确认修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script  setup>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
const dialogFormVisible = ref(false)
const dialogForm = ref(false)
const formLabelWidth = '140px'
const tableData = defineProps({
    message: [],
    keys: [],
    remove: '',
    add: '',
    edit: '',
    table: '',
})

const data = reactive({
    name: '',
    address: '',
    restaurants: [],
    message: [],
    state: '',
    result: {},
    keys: [],
    click:[]
})

onMounted(() => {
    data.restaurants = tableData.message
    data.keys = tableData.keys
})
const deleteRow = (index, row) => {
    tableData.message.splice(index, 1)
    axios.post(tableData.remove,row).then(res=>{
        if(res.status === 200){
            alert('删除成功')
        }
    })
}
const onAdditem = () => {
    tableData.message.push(data.result)
    dialogFormVisible.value = false;
    axios.post(tableData.add,data.result).then(res=>{
        if(res.status===200)
            alert('添加成功')
    })
}

const onEdititem = () => {
    dialogForm.value = false;
    axios.post(tableData.edit, data.click).then(res => {
        if (res.status === 200)
            alert('修改成功')
    })
}

const querySearch = (queryString, cb) => {
    const results = queryString
        ? data.restaurants.filter(createFilter(queryString))
        : data.restaurants
    // call callback function to return suggestions
    data.message = results;
    cb(results)
}
const createFilter = (queryString) => {
    return (restaurant) => {
        var result = restaurant.name || restaurant.s_name || restaurant.course_name || restaurant.no
        return (
            result.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        )
    }
}
const handleSelect = (item) => {
    data.state = item.name;
    data.message = [item]
}
const show = (index, row) => {
    data.click = row
    dialogForm.value=true
    console.log(row)
}
const exportExcel = () => {
    /* generate workbook object from table */
    var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
    var table = document.querySelector('#exportTab').cloneNode(true)
    //table.removeChild(table.querySelector('.el-table__fixed')) //这里是双下划线
    var wb = XLSX.utils.table_to_book(table, xlsxParam)
    /* get binary string as output */
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), tableData.table + '.xlsx')
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.log(e, wbout)
        }
    }
    return wbout
}
</script>

<style lang="less" scoped>
#header {
    padding: 5px;

    #inputAuto {
        float: right
    }
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>