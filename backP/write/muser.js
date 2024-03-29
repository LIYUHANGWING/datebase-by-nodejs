//导入数据库模块
const db=require('../yjdb/index')

//导入加密模块bcryptjs
const bcrypt = require('bcryptjs')
//导入token包对用户信息加密
const jwt=require('jsonwebtoken')

const config = require('../schema/config')


exports.regUser=(req,res)=>{
    const userinfo = req.body
   //合法性检验
   /*if(!userinfo.username||!userinfo.password){
    return res.send({
        status:1,message: '不合法'
    })
   }*/
   //定义sql语句，查询用户名是否被占用
   const sqlStr='select * from yjdb.mtable where username=?'

   db.query(sqlStr,userinfo.username,(err,results)=>{
    if(err){
        return res.send({status :1,message: err.message})
    }
    if(results.length>0){
        return res.send({status:1,message:'已被占用'})
    }
   })
   //插入语句
   const sql='insert into yjdb.mtable set ?'
   
   //
   db.query(sql,{ username:userinfo.username,password:userinfo.password,email:userinfo.email},(err,results)=>{
    console.log(userinfo)

    userinfo.password = bcrypt.hashSync(userinfo.password,10)
    console.log(userinfo)
    if(err) return res.send({status:1,message:err.message})
    if(results.affectedRows !==1){
        return res.send({status:1,message:'用户注册失败'})
    }
    //调用bcrypt对客户端传送过来的密码加密()

    res.send({status:0,message:'注册成功'})

   })
    //res.send('reguser ok')
}
exports.login=(req,res)=>{
    //接受表单数据
    const userinfo=req.body
//
    const sql='select * from yjdb.mtable where username=?'
    //
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) {return res.send({status :1,message: err.message})
    }
        if(results.length!==1){
            return res.cc('登录失败!该用户不存在')
        } 
       // const compareResults=bcrypt.compare(userinfo.password,results[0].password)
        if(userinfo.password!==results[0].password){                         
                return res.cc('登录失败！密码错误')
        }
        //res.send('登录成功')
        //$2a$10$4MIlqGkVpTMBVpNy2spanPRevd69u4cA6qg0UPNeciy3Whyo.N3MeN6
   
   const user ={...results[0],password:'',user_pic:''}

   const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})//有效期10小时

   res.send({
    status: 0,
    message: '登录成功',
    token: 'Bearer '+tokenStr
   })
})
}