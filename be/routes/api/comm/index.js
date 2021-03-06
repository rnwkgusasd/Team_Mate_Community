var express=require('express');
var createError=require('http-errors');
var router=express.Router();
const CommDoc = require('../../../models/commDoc')


router.get('/', function(req, res, next) {
    CommDoc.find()
      .then(r => {
        res.send({ success : true, commDoc: r})
      })
      .catch(e => {
        res.send({ success : false})
      })
});

  router.post('/', (req, res, next) => {
    const { title, desc, writerid, writer, docNum, viewCnt, likeCnt } = req.body
    const u = new CommDoc({ title, desc, writerid, writer, docNum, viewCnt, likeCnt })
      u.save()
        .then(r => {
          res.send({ success: true, msg: r })
        })
        .catch(e => {
          res.send({ success: false, msg: e.message })
        })
  
    console.log(req.query)
    console.log(req.body)
    res.send({ success: true, msg: 'post ok' })
  });
  router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const { title, desc,writerid, writer, docNum, viewCnt, likeCnt } = req.body
    CommDoc.updateOne({ _id: id }, { $set: { title, desc,writerid, writer, docNum, viewCnt, likeCnt }})
      .then(r => {
        res.send({ success: true, msg: r })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
    // res.send({ success: true, msg: 'put ok' })
  })
  router.delete('/:id', (req, res, next) => { 
    const id = req.params.id
    console.log("id",id)
    CommDoc.deleteOne({ _id: id })
      .then(r => {
        res.send({ success: true, msg: r })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
    res.send({ success: true, msg: 'del ok' })
  })

  router.all('*', function(req, res, next) {
    next(createError(404, 'API를 찾을 수 없습니다.'));
  });

  
module.exports=router;

// router.get('/',function(req,res,next){
//     res.send({msg:'Linked comm'})
// })