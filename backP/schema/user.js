//导入验证规则的包
//const { string } = require('joi')
const joi = require('joi')
//定义用户名和密码规则
const username=joi.string().alphanum().min(1).max(10).required()
const password =joi.string().pattern(/^[\S]{6,12}$/).required()
//定义验证规则的数据对象
const id=joi.number().integer().min(1).required()

const user_email= joi.string().email().required()

exports.reg_login_schema = {
    body:{
        username,
        password,
    },
}
//验证更新用户信息
exports.update_userinfo_schema={
    body : {
        id,
        password,
        email:user_email,
    }
}