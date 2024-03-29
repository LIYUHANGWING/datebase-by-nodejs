//导入服务器
const express=require('express')
//创建服务器对象
const app=express()
//cors跨域
const joi = require('@hapi/joi')

const cors = require('cors')
//将cors注册为中间件
app.use(cors())
//配置解析表
app.use(express.urlencoded({
    extended:false
}))

app.use((req,res,next)=>{
    res.cc=function(err,status = 1){
        res.send({
            status,
            message :err instanceof Error ? err.message : err,
        })
    }
    next()
})
//jwt token解密相关
const  {  expressjwt : Ejwt }  =  require ( "express-jwt" )

const config=require('./schema/config')

app.use(Ejwt({ secret: config.jwtSecretKey,algorithms:["HS256"] }).unless({path: [/^\/api\//],}))
//导入路由
const userRouter=require('./black/muser')
app.use('/api',userRouter)

//导入路由
//const userinfoRouter = require('./Router/userinfo')
//const router=require('./Router/user')
//app.use('/my',userinfoRouter)
//定义错误级别中间件 
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }
    if(err.name==='UnauthorizedError'){
        return res.cc('身份认证败')
    }
    res.cc(err)

})
//插入商品信息


const goodsinRouter=require('./black/goods')

app.use('/api',goodsinRouter)
//更改信息
//const maketinfoh=require('./ysRouter/maketinfo')

//app.use('/api',maketinfoh)

//图片路由
const gsinfoRouter=require('./black/goodsinfo')

app.use('/api',gsinfoRouter)

app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007')
})
//module.exports=router