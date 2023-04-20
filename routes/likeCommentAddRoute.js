const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.post('/like/:collection_id', (req, res) => {
  let sessionObj = req.session;
  let c_id = req.params.collection_id;

  if (!sessionObj.sess_valid) return res.redirect('/login')

  let user_id = sessionObj.sess_user.user_id;

  let ep = `http://localhost:4000/like/${c_id}`

  axios.post(ep, querystring.stringify({ c_id, user_id })).then(response => {
    res.redirect(`/collections/${c_id}`)
  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })

})

router.post('/addcomment/:collection_id', (req, res) => {
  let sessionObj = req.session;
  let c_id = req.params.collection_id;
  let comment_message = req.body.commentMessage;

  if (comment_message == "") return res.redirect(`/collections/${c_id}`)

  if (!sessionObj.sess_valid) return res.redirect('/login')

  let user_id = sessionObj.sess_user.user_id;
  let ep = `http://localhost:4000/addcomment/${c_id}`

  axios.post(ep, querystring.stringify({ c_id, comment_message, user_id })).then(response => {
    let responseData = response.data;

    if (responseData.success) {
      res.redirect(`/collections/${c_id}`)
    } else {
      res.render('login', { data })
    }
  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })

})


module.exports = router;