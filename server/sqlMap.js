// todo sql 语句留后面调用
module.exports = {
    user: {
        // ? 占位符 后面给数据自动填充
        getUser: "select * from users where username = ? and password = ?",
        getStudents: "select * from students"
    },
};