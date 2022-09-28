// 测试用 api 实例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败',
        });
    } else {
        res.json(ret);
    }
};
// 增加用户接口
// POST 请求
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    // ! [params.username, params.age] 自动填充到之前 ？ 里面
    conn.query(sql, [params.id, params.name, params.age], (err, result) => {
        if (err) return console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});
// GET 请求
// router.get('/getUser', (req, res) => {
//     let sql = $sql.user.get;
//     let params = req.query;
//     console.log(params);
//     conn.query(sql, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(res, result);
//     });
// });
// module.exports = router;

router.post('/getUser', (req, res) => {
    let sql = $sql.user.get;
    let params = req.body;
    console.log(params);

    conn.query(sql, [params.username,params.password], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});
module.exports = router;