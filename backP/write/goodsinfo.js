const db=require('../yjdb/index')

exports.getgods=(req,res)=>{
    const sql ='select *from yjdb.gtable where goodsname=?'
    db.query(sql,req.query.goodsname,(err,results)=>{
        if(err){
            return res.cc(err)
        }
        res.send({
            status:0,
            message :'获取成功',
            data :results,
        })
    })
}