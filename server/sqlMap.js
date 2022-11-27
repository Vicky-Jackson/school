// todo sql 语句留后面调用
module.exports = {
    user: {
        // ? 占位符 后面给数据自动填充
        getUser: "select * from users where username = ? and password = ?",
        getStudents: "select * from students",
        getTeachers: "select * from teachers",
        getSign:"select * from releaseSign where t_id = ?",
        getSignin: "select * from signdetail where s_id = ?",
        getAnouncement: "select * from anouncement",
        addSign: "insert into releasesign(type,t_id,startTime,endTime,number,tableName) values(?,?,?,?,?,?)",
        addWork: "insert into releasework(type,t_id,time,detail,tableName) values(?,?,?,?,?)"
    },
};