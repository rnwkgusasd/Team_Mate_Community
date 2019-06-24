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
    const { name, sex, age, userID, userPW } = req.body
    const u = new Signup({ name, sex, age, userID, userPW })
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

router.all('*', function(req, res, next) {
    next(createError(404, 'API를 찾을 수 없습니다.'));
  });

module.exports = router;