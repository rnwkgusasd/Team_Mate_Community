var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/signupM')


router.get('/', function(req, res, next) {
  const us = [
    {
      name: '테스트1',
      sex: 14
    },
    {
      name: '테스트2',
      sex: 24
    }
  ]
  res.send({ users: us })
});


module.exports = router;

  //Restful
  router.get('/', function(req, res, next) {

    User.find()
      .then(r => {
        res.send({ success : true, users: r})
      })
      .catch(e => {
        res.send({ success : false})
      })

  // console.log(req.query)
  // console.log(req.body)
  //
  // res.send({ users: us })
});

router.post('/', (req, res, next) => {

  const { name, sex, age, userID, userPW } = req.body
  const u = new User({ name, sex, age, userID, userPW })
    u.save()
      .then(r => {
        res.send({ success: true, msg: r })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })

  // console.log(req.query)
  // console.log(req.body)
  // res.send({ success: true, msg: 'post ok' })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, sex, age, userID, userPW } = req.body
  User.updateOne({ _id: id }, { $set: { name, sex, age, userID, userPW }})
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

module.exports = router;
