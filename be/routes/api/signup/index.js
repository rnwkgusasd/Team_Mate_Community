var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Signup = require('../../../models/signupM')




module.exports = router;

router.get('/', function(req, res, next) {

    Signup.find()
      .then(r => {
        res.send({ success : true, users: r})
      })
      .catch(e => {
        res.send({ success : false})
      })
});

router.post('/', (req, res, next) => {
    const { name, userID, userPW, likeDoc } = req.body
    const u = new Signup({ name, userID, userPW, likeDoc })
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
  router.post('/:id', (req, res, next) => {    //사용자가 댓글을 추가했을 때 likeDoc배열에 내용 추가할 때 사용
    const id = req.params.id
    var push1 = Signup.findOne({_id: id})
    push1.likeDoc.push({likeDocid:req.docNum});
      push1.save()
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
router.all('*', function(req, res, next) {
    next(createError(404, 'API를 찾을 수 없습니다.'));
  });

module.exports = router;
