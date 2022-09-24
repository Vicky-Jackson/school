// todo sql 语句留后面调用
module.exports = {
    user: {
        // ? 占位符 后面给数据自动填充
        add: 'insert into te_user(id,name, age) values(?,?, ?)',
        get: "select * from te_user where name =?",
    },
};