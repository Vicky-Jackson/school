// 把文件按照二进制方式读取
export const readFile = file => {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
            resolve(ev.target.result)
        }
    })
}