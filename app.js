var express = require("express");
var app = express();
var router=require('./router/router.js');
var session =require('express-session');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//设置模板引擎
app.set("view engine", "ejs");

//静态。(设置Response Headers请求头的Cache-Control为max-age=7200)
app.use(express.static("./public",{
   maxage: '30d'
}));
// app.use(express.static("./public"));


app.get('/public/images/*', function (req, res) {
	console.log('req.url: '+req.url);
    res.sendFile( __dirname + "/" + req.url );
    console.log("Request for " + req.url + " received.");
})




//显示首页(登录页面)
app.get('/',router.index);
//登录
app.post('/login',router.login);
//显示注册页面
app.get('/noteRegister',router.noteRegister);
//注册
app.post('/register',router.register);
//显示备忘录
app.get('/notePages',router.notePages);
//获取个人所有备忘录文本
// app.get('/noteNotes',router.noteNotes);
app.get('/noteNotes/:id?',router.noteNotes);
//搜索备忘录
app.post('/search',router.search);
//获取用户信息页面
app.get('/noteUser',router.noteUser);
//显示修改用户名页面
app.get('/noteUsername',router.noteUsername);
//修改用户的用户名
app.post('/noteChangeUsername',router.noteChangeUsername);
//显示修改用户密码页面
app.get('/notePassword',router.notePassword);
//修改用户的密码
app.post('/noteChangePassword',router.noteChangePassword);
//显示修改用户手机号页面
app.get('/noteTelephone',router.noteTelephone);
//用户绑定手机号
app.post('/bindTelephone',router.bindTelephone);
//显示搜索页面
app.get('/noteSearch',router.noteSearch);
//显示编辑页面
app.get('/noteEdit/:id?',router.noteEdit);
//发表备忘记录
app.post('/record/:id?',router.record);
//删除单条备忘记录
app.post('/delete/:id?',router.delete);
//获取图片验证码
app.get('/captcha',router.captcha);
//获取手机验证码
app.post('/teleCode',router.teleCode);
//第三方登录
//QQ第三方登录
app.get('/sign',router.sign);
//退出登录
app.get('/signOut',router.signOut);
// app.get('/signOut',router.notePages);
//更改头像页面
app.get('/avatar',router.avatar);
//更改头像
app.post('/changeAvatar',router.changeAvatar);



app.get('/test',router.test);

/*app.listen(3389);
app.listen(app.get('port'), function () {
    console.log('node-note');
});*/

let server = app.listen(3389, 'localhost', function () {
    console.log("地址信息:",server.address());
    const host = server.address().address;
    const port = server.address().port;
    console.log("======启动服务http://%s:%s======", host, port);
})
