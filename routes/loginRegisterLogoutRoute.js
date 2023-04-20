const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.get('/login', (req, res) => {
  let sessionObj = req.session;

  backURL = req.header('Referer') || '/';
  sessionObj.backURL = backURL

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

    if (!responseData.success) return res.render('login', { responseData })

    sessionObj.sess_valid = true;
    sessionObj.sess_user = responseData.data;

    console.log(sessionObj)

    res.redirect(sessionObj.backURL || '/')

  }).catch((error) => {
    console.log(error);
  })
})

router.get('/logout', (req, res) => {
  let sessionObj = req.session;

  backURL = req.header('Referer') || '/';
  sessionObj.backURL = backURL

  delete sessionObj.sess_valid;
  delete sessionObj.sess_user

  res.redirect(sessionObj.backURL)
})

router.get('/register', (req, res) => {
  let sessionObj = req.session;

  if (sessionObj.sess_valid) {
    res.redirect('/')
  } else {
    res.render('register')
  }
})

router.post('/register', (req, res) => {
  let sessionObj = req.session;

  let user_name = req.body.username;
  let password = req.body.password;
  let dob = req.body.dob;
  let gender = req.body.gender
  let nationality = req.body.nationality

  // console.log(req.body)

  let ep = `http://localhost:4000/register`

  axios.post(ep, querystring.stringify({ user_name, password, dob, gender, nationality })).then(response => {

    let responseData = response.data;

    console.log(responseData)

    if (!responseData.success) return res.render('register', { responseData })

    sessionObj.sess_valid = true;
    sessionObj.sess_user = responseData.data;

    res.redirect(sessionObj.backURL || '/')

  }).catch((error) => {
    console.log(error);
  })
})

module.exports = router;