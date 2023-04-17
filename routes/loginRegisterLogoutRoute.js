const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.get('/login', (req, res) => {
  let sessionObj = req.session;

  if (sessionObj.sess_valid) {
    res.redirect('/')
  } else {
    res.render('login')
  }
})

router.post('/login', (req, res) => {
  let sessionObj = req.session;

  let user_name = req.body.username;
  let password = req.body.password;

  let ep = `http://localhost:4000/login`

  axios.post(ep, querystring.stringify({ user_name, password })).then(response => {

    let responseData = response.data;

    if (responseData.success) {
      sessionObj.sess_valid = true;
      sessionObj.sess_user = responseData.data;

      res.redirect('/')
    } else {
      res.render('login', { data })
    }
  }).catch((error) => {
    console.log(error);
  })
})

router.get('/logout', (req, res) => {
  delete req.session.sess_valid;
  delete req.session.sess_user
  res.redirect('/')
})

router.get('/register', (req, res) => {
  let sessionObj = req.session;

  if (sessionObj.sess_valid) {
    res.redirect('/')
  } else {
    res.render('register')
  }
})

module.exports = router;