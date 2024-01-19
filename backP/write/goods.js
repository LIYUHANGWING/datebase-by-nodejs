const db=require('../yjdb/index')

exports.actin = (req,res)=>{
    const cuser=req.body
    const sql = 'insert into yjdb.gtable set?'
    db.query(sql,{goodsname: cuser.goodsname,goodsnum:cuser.goodsnum,gpr:cuser.gpr,gtime:cuser.gtime},(err,results)=>{
        
        if(err) return res.send({status:1,message:err.message})

        if(results.affectedRows !==1){
            return res.send({status:1,message:'用户录入失败'})
        }
        res.send({status:0,message:'录入成功',results})
        console.log(results)
       })
}
exports.updateactInfo=(req,res)=>{
    const sql='update yjdb.gtable set ? where id = ? '
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err){
            return res.cc(err)
        }
        if(results.affectedRows !==1){          
            return res.cc('更新信息失败')
        }
        res.cc('更新成功',0)
    })
}