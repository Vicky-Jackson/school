// todo sql 语句留后面调用
module.exports = {
    user: {
        // ? 占位符 后面给数据自动填充
        getUser: "select * from users where username = ? and password = ?",
        getMessage: "select * from loginall where id = ?",
        getUserall: "select * from users",
        removeUser: "delete from users where username = ?",
        addUser: "insert into users(username,password,no,role) values(?,?,?,?)",
        editUser: "update user set username = ?,password = ?,role=? where no = ?",
        getStudents: "select * from students",
        removeStudent: "delete from students where s_id = ?",
        addStudent: "insert into students(s_id,s_name,sex,phone,email,address,class) values(?,?,?,?,?,?,?)",
        editStudent: "update students set s_name=?,sex=?,phone=?,email=?,address=?,class=? where s_id = ?",
        getCourseStudents: "select * from coursedetail",
        getCourse: "select * from courses",
        removeCourse: "delete from courses where c_id = ?",
        addCourse: "insert courses(c_id,course_name,t_id,time,class) values(?,?,?,?,?)",
        editCourse: "update courses set course_name = ?, t_id= ?, time = ?, class = ? where c_id = ?",
        getTeachers: "select * from teachers",
        removeTeacher: "delete from teachers where t_id = ?",
        addTeacher: "insert into teachers(t_id,name,sex,phone,email,address) values(?,?,?,?,?,?)",
        editTeacher: "update teahers set name=?,sex=?phone=?,email=?,address=? where t_id = ?",
        getSign: "select * from releaseSign where t_id = ?",
        getSignin: "select * from signdetail where s_id = ?",
        getAnouncement: "select * from anouncement",
        addAnouncement: "insert into anouncement(title,detail,time) values(?,?,?)",
        getScore: "select * from scoredetail",
        removeScore: "delete from score where s_id=? and c_id= ?",
        addScore: "insert score(s_id,c_id,score) values(?,?,?)",
        updateScore: "update score set score = ? where s_id = ? and c_id = ?",
        addSign: "insert into releasesign(type,t_id,startTime,endTime,number,tableName) values(?,?,?,?,?,?)",
        addWork: "insert into releasework(t_id,title,startTime,endTime,detail,tableName) values(?,?,?,?,?,?)",
        getWork: "select * from releaseWork where t_id = ?",
        getWorkin: "select * from workdetail where s_id = ?",

    },
};