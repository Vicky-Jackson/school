<template>
    <div id="add">
        <div style="padding:10px">
            <el-button type="success" @click="exportExcel" style="margin-right:5px;margin-top:-4px">
                <el-icon>
                    <Upload />
                </el-icon>
                导出
            </el-button>
            <el-upload action accept='.xls,.xlsx' :auto-upload='false' :on-change='inputFile' :show-file-list='false'
                style="display:inline">
                <el-button type="success">
                    <el-icon>
                        <Download />
                    </el-icon>
                    导入
                </el-button>
            </el-upload>
            <div id="edit">
                <el-button type="primary" @click="handleEdit">编辑</el-button>
                <el-button type="primary" @click="handleSave">保存</el-button>
            </div>
        </div>

        <el-table id="exportTab" :data="data.msg" border style="width: 95%; margin-left:30px" :row-style="rowState"
            @cell-click="cellClick">
            <el-table-column prop="c_id" label="课程id" width="180" />
            <el-table-column prop="course_name" label="课程" width="180" />
            <el-table-column prop="s_name" label="学生" width="180">

            </el-table-column>
            <el-table-column prop="score" label="成绩" >
                <template #default="scope">
                    <span v-show="!data.editScore">{{ scope.row.score }}</span>
                    <el-input v-show="data.editScore" v-model="scope.row.score"
                        @blur="editColumnData(scope.row, 'score')"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <em>修改后请记得保存</em>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { readFile } from '../../plugins/excel/readFile'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import axios from 'axios';
import store from '../../store';
import { Download, Upload } from '@element-plus/icons-vue';
const data = reactive({
    msg: [],
    message: [],
    editScore: false,
    i:0
})
onMounted(() => {
    axios.get('/api/user/getScore', {
        params: {
            t_id: store.state.userInfo.username
        }
    }).then(res => {
        if (res.data.length > 0) {
            data.msg = res.data
        }
    })
})
const exportExcel = () => {
    /* generate workbook object from table */
    var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
    var table = document.querySelector('#exportTab').cloneNode(true)
    //table.removeChild(table.querySelector('.el-table__fixed')) //这里是双下划线
    var wb = XLSX.utils.table_to_book(table, xlsxParam)
    /* get binary string as output */
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'studentScore.xlsx')
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.log(e, wbout)
        }
    }
    return wbout
}

const inputFile = async (e) => {
    let file = e.raw
    if (!file) return
    // 读取file文件的内容(转换为json格式)
    let result = await readFile(file)
    // type :'binary' 类型为二进制
    let eleData = XLSX.read(result, { type: "binary" })
    let eleDataSheet = eleData.Sheets[eleData.SheetNames[0]]
    eleData = XLSX.utils.sheet_to_json(eleDataSheet) // 将解析出的数据转换为json格式（xlsx自带的方法）
    const keyObj = {
        课程id: "c_id",
        课程: "course_name",
        学生: "s_name",
        成绩: "score",
    };

    eleData.forEach((item) => {
        // 将中文的键名替换成英文的
        for (let k in keyObj) {
            let newKey = keyObj[k];
            if (newKey) {
                item[newKey] = item[k];
                delete item[k];
            }
        }
    });
    data.msg = eleData
    alert('导入成功')
}
const cellClick = (row, column, cell, event) => {

}
const editColumnData = (row, column) => {
    data.msg.filter(item => {
        if (item.s_id === row.s_id) {
            item.score = row.score;
        }
    })
}
const handleEdit = () => {
    data.editScore = true
}
const handleSave = () => {
    data.editScore = false
    data.i = 0
    data.msg.filter(item => {
        axios.post('/api/user/updateScore', item).then(res => {
            if (res.status === 200) {
                data.i++;
            }
            else{
                alert('录入失败')
                return;
            }
            if(data.i===data.msg.length){
                alert('录入成功')
            }
        })
    })
}
</script>

<style lang="less" scoped>
#add {
    min-height: 100vh;
    background-color: black;
}

#edit {
    position: absolute;
    top: 70px;
    left: 85%
}

em {
    font-size: 20px;
    color: rgb(88, 88, 88)
}
</style>