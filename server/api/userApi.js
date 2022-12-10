// 测试用 api 实例
var models = require('../db');
var express = require('express');
var fs = require("fs"); //文件模块
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var path = require('path')
var $sql = require('../sqlMap');
var formidable = require('formidable'); //上传图片处理的插件
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

router.post('/getUser', (req, res) => {
    let sql = $sql.user.getUser;
    let params = req.body;
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

router.get('/getUserall', (req, res) => {
    let sql = $sql.user.getUserall;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/removeUser', (req, res) => {
    let sql = $sql.user.removeUser;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.username],(err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addUser', (req, res) => {
    let sql = $sql.user.addUser;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.username,params.password,params.no,params.role], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/editUser', (req, res) => {
    let sql = $sql.user.editUser;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.password, params.role,params.no], (err, result) => {
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

router.post('/removeStudent', (req, res) => {
    let sql = $sql.user.removeStudent;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.s_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addStudent', (req, res) => {
    let sql = $sql.user.addStudent;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.s_id, params.s_name, params.sex, params.phone, params.email, params.address, params.class], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/editStudent', (req, res) => {
    let sql = $sql.user.editStudent;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.s_name, params.sex, params.phone, params.email, params.address, params.class, params.s_id], (err, result) => {
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

router.post('/removeTeacher', (req, res) => {
    let sql = $sql.user.removeTeacher;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.t_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addTeacher', (req, res) => {
    let sql = $sql.user.addTeacher;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.t_id, params.name, params.sex, params.phone, params.email, params.address], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/editTeacher', (req, res) => {
    let sql = $sql.user.editTeacher;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.sex, params.phone, params.email, params.address, params.t_id], (err, result) => {
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
        '(id int  auto_increment not null primary key,s_id varchar(255) not null,s_name varchar(255) CHARACTER SET utf8mb4 NOT NULL,time datetime not null,address varchar(255) CHARACTER SET utf8mb4 NOT NULL,photo longtext)';
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
    var sql = ("insert into " + params.tableName).replace(/[\\"']/g, "") + '(s_id,s_name,time,address,photo) values(?,?,?,?,?)';

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
    var sql = ("select * from " + params.name).replace(/[\\"']/g, "");
    if (params.id)
        sql += ' where s_id = "' + params.id + '"';
    console.log(params);
    conn.query(sql, (err, result) => {
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

router.post('/createWork', (req, res) => {
    let params = req.body;
    console.log(params);
    let sql = 'create table ' + params.name +
        '(id int  auto_increment not null primary key,s_id varchar(255) not null,s_name varchar(255) CHARACTER SET utf8mb4 NOT NULL,time datetime not null,detail longtext CHARACTER SET utf8mb4 NOT NULL)';
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
    conn.query(sql, [params.t_id, params.title, params.startTime, params.endTime, params.detail, params.tableName], (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addWorkin', (req, res) => {
    var params = req.body;
    console.log(params);
    var sql = ("insert into " + params.tableName).replace(/[\\"']/g, "") + '(s_id,s_name,time,detail) values(?,?,?,?)';

    // ! [params.username, params.age] 自动填充到之前 ？ 里面
    conn.query(sql, [params.s_id, params.s_name, params.time, params.detail], (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getWorkStudent', (req, res) => {
    var params = req.query;
    var sql = ("select * from " + params.name).replace(/[\\"']/g, "");
    if (params.id)
        sql += ' where s_id = "' + params.id + '"';
    console.log(params);
    console.log(sql)
    conn.query(sql, (err, result) => {
        if (err)
            console.log(err);
        if (result) {
            jsonWrite(res, result);
        }
    });
});
router.get('/getWorkin', (req, res) => {
    let sql = $sql.user.getWorkin;
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

router.get('/getWork', (req, res) => {
    let sql = $sql.user.getWork;
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

router.post('/addAnouncement', (req, res) => {
    let sql = $sql.user.addAnouncement;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.title, params.detail, new Date()], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getScore', (req, res) => {
    let sql = $sql.user.getScore;
    let params = req.query;
    console.log(params);
    if (params.t_id)
        sql += ' where t_id = "' + params.t_id + '"';
    else if (params.s_id)
        sql += ' where s_id = "' + params.s_id + '"';
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});
router.post('/removeScore', (req, res) => {
    let sql = $sql.user.removeScore;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.s_id,params.c_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addScore', (req, res) => {
    let sql = $sql.user.addScore;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.s_id, params.c_id, params.score], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});
router.post('/updateScore', (req, res) => {
    let sql = $sql.user.updateScore;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.score, params.s_id, params.c_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});


const upload = multer({
    storage: multer.diskStorage({
        //设置文件存储位置
        destination: function (req, file, cb) {
            let dir = "../public/image" //图片存储的目录
            //判断目录是否存在，没有则创建
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
            //dir就是上传文件存放的目录
            cb(null, dir);
        },
        //设置文件名称
        filename: function (req, file, cb) {
            // 取无后缀的文件名
            let ex_name = file.originalname.split('.')[0]
            console.log(ex_name)
            //防止文件名重复，为文件名加上时间戳
            let fileName = ex_name + '-' + Date.now() + '-' + path.extname(file.originalname);
            //fileName就是上传文件的文件名
            cb(null, fileName);
        }
    })
})

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.send({
        error: 0,
        data: [{
            isOK: true,
            imgPath: req.file.path, //文件存储的路径
            imgName: req.file.filename
        }]
    })
});

router.get('/getCourseStudent', (req, res) => {
    let sql = $sql.user.getCourseStudents;
    let params = req.query;
    console.log(params);
    if (params.role == 'teacher') {
        sql += ' where t_id = "' + params.id + '"'
    } else if (params.role == 'student') {
        sql += ' where s_id = "' + params.id + '"'
    }
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.get('/getCourse', (req, res) => {
    let sql = $sql.user.getCourse;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/removeCourse', (req, res) => {
    let sql = $sql.user.removeCourse;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.c_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/addCourse', (req, res) => {
    let sql = $sql.user.addCourse;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.c_id, params.course_name, params.t_id, params.time, params.class], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});

router.post('/editCourse', (req, res) => {
    let sql = $sql.user.editCourse;
    let params = req.body;
    console.log(params);
    conn.query(sql, [params.course_name, params.t_id, params.time, params.class,params.c_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
});
module.exports = router;