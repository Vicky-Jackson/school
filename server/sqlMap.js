// todo sql 语句留后面调用
module.exports = {
    user: {
        // ? 占位符 后面给数据自动填充
        getUser: "select * from users where username = ? and password = ?",
        getMessage: "select * from loginall where id = ?",
        getStudents: "select * from students",
        getCourseStudents: "select * from coursedetail",
        getTeachers: "select * from teachers",
        getSign:"select * from releaseSign where t_id = ?",
        getSignin: "select * from signdetail where s_id = ?",
        getAnouncement: "select * from anouncement",
        getScore:"select * from scoredetail",
        addSign: "insert into releasesign(type,t_id,startTime,endTime,number,tableName) values(?,?,?,?,?,?)",
        addWork: "insert into releasework(t_id,title,startTime,endTime,detail,tableName) values(?,?,?,?,?,?)",
        getWork: "select * from releaseWork where t_id = ?",
        getWorkin: "select * from workdetail where s_id = ?",
    }, 
};