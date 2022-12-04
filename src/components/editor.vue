<template>
    <div id="editor">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor style="height: 300px;  overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            :mode="mode" @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from 'axios'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const mode = ref('default')

// 模拟 ajax 异步获取内容
onMounted(() => {

})

const toolbarConfig = {}
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/user/upload',
    // server: '/api/upload-img-10s', // test timeout
    // server: '/api/upload-img-failed', // test failed
    // server: '/api/xxx', // test 404

    timeout: 5 * 1000, // 5s
    fieldName: 'file',
    meta: { token: 'xxx', a: 100 },
    metaWithUrl: true, // join params to url
    headers: { Accept: 'text/x-json' },

    maxFileSize: 10 * 1024 * 1024, // 10M

    base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb

    onBeforeUpload(file) {
        console.log('onBeforeUpload', file)
        return file // will upload this file
        // return false // prevent upload
    },
    onProgress(progress) {
        console.log('onProgress', progress)
    },
    onSuccess(file, res) {
        console.log('onSuccess', file, res)
    },
    onFailed(file, res) {
        alert(res.message)
        console.log('onFailed', file, res)
    },
    onError(file, err, res) {
        alert(err.message)
        console.log('onError', file, err, res)
    },
    customInsert(res, insertFn) {
        console.log('customInsert', res)
        const imgInfo = res.data[0] || {}
        let url = imgInfo.imgName
        let href = imgInfo.imgPath
        if (!url) throw new Error(`Image url is empty`)
        console.log('Your image url ', url)
        url = 'http://10.3.81.111:5173/'+ url;
        console.log(url);
        insertFn(href,url)
    },
}

</script>    

<style lang="less" scoped>
#editor {
    border: 1px solid #ccc;
    width: 750px;
}
</style>