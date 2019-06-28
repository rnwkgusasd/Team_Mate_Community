var express=require('express');
var createError=require('http-errors');
var router=express.Router();
const CommRpl=require('../../../models/commRpl')


router.get('/', function(req, res, next) {
    CommRpl.find()
      .then(r => {
        res.send({ success : true, commRpl: r})
      })
      .catch(e => {
        res.send({ success : false})
      })
});

  router.post('/', (req, res, next) => {
    const { docNum,writer,desc,rplNum } = req.body
    const u = new CommRpl({ docNum,writer,desc,rplNum })
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
    const { docNum,writer,desc,rplNum } = req.body
    User.updateOne({ _id: id }, { $set: { docNum,writer,desc,rplNum }})
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
    User.deleteOne({ _id: id })
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
//     res.send({msg:'Linked rpl'})
// })