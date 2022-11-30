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
// router.post('/addUser', (req, res) => {
//     var sql = $sql.user.add;
//     var params = req.body;
//     console.log(params);
//     // ! [params.username, params.age] 自动填充到之前 ？ 里面
//     conn.query(sql, [params.id, params.name, params.age], (err, result) => {
//         if (err) return console.log(err);
//         if (result) {
//             jsonWrite(res, result);
//         }
//     });
// });
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

router.get('/getUser', (req, res) => {
    let sql = $sql.user.getUser;
    let params = req.query;
    console.log(params);

    conn.query(sql, [params.username, params.password], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getMessage', (req, res) => {
    let sql = $sql.user.getMessage;
    let params = req.query;
    console.log(params);

    conn.query(sql, [params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getStudents', (req, res) => {
    let sql = $sql.user.getStudents;
    let params = req.body;
    console.log(params);
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getTeachers', (req, res) => {
    let sql = $sql.user.getTeachers;
    let params = req.body;
    console.log(params);
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/createSign', (req, res) => {
    let params = req.body;
    console.log(params);
    let sql = 'create table ' + params.name +
        '(id int  auto_increment not null primary key,s_id varchar(255) not null,s_name varchar(255) not null,time datetime not null,address varchar(255),photo longtext)';
    sql.replace(/[\\"']/g, "");
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addSign', (req, res) => {
    var sql = $sql.user.addSign;
    var params = req.body;
    console.log(params);
    // ! [params.username, params.age] 自动填充到之前 ？ 里面
    conn.query(sql, [params.type, params.t_id, params.startTime, params.endTime, params.number, params.tableName], (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addSignin', (req, res) => {
    var params = req.body;
    console.log(params);
    var sql = ("insert into" + params.tableName).replace(/[\\"']/g, "")+'(s_id,time,address,photo) values(?,?,?,?)';
    
    // ! [params.username, params.age] 自动填充到之前 ？ 里面
    conn.query(sql, [params.s_id, params.s_name, params.time, params.address, params.photo], (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getSignStudent', (req, res) => {
    var params = req.query;
    var sql = ("select *" + params.name).replace(/[\\"']/g, "");
    if(params.id)
        sql+='where s_id = '+ params.id;
    console.log(params);
    conn.query(sql, (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getSignStudent', (req, res) => {
    var sql = $sql.user.getSignin;
    var params = req.query;
    console.log(params);
    // ! [params.username, params.age] 自动填充到之前 ？ 里面
    conn.query(sql, [params.id], (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getSign', (req, res) => {
    let sql = $sql.user.getSign;
    let params = req.query;
    console.log(params);

    conn.query(sql, [params.id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getSignin', (req, res) => {
    let sql = $sql.user.getSignin;
    let params = req.body;
    console.log(params);

    conn.query(sql, [params.id],(err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/createWork', (req, res) => {
    let params = req.body;
    console.log(params);
    let sql = 'create table ' + params.name + 
    '(id int  auto_increment not null primary key,s_id varchar(255) not null,time datetime not null,detail longtext)';
    sql.replace(/[\\"']/g, "");
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addWork', (req, res) => {
    var sql = $sql.user.addWork;
    var params = req.body;
    console.log(params);
    // ! [params.username, params.age] 自动填充到之前 ？ 里面
    conn.query(sql, [params.t_id, params.title,params.startTime, params.endTime, params.detail, params.tableName], (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getAnouncement', (req, res) => {
    let sql = $sql.user.getAnouncement;
    let params = req.query;
    console.log(params);

    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getScore', (req, res) => {
    let sql = $sql.user.getAnouncement;
    let params = req.query;
    console.log(params);
    if(params.t_id)
        sql+='where t_id = '+params.t_id;
    else if(params.s_id)
        sql+='where s_id = '+params.s_id;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

module.exports = router;