const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');


router.post('/deletecollection/:collectionid', (req, res) => {
  let sessionObj = req.session;

  if (!sessionObj.sess_valid) return res.redirect('/login')

  let c_id = req.params.collectionid
  let userID = sessionObj.sess_user.user_id;

  let ep = `http://localhost:4000/deletecollection/${c_id}`

  axios.post(ep, querystring.stringify({ userID })).then(response => {
    res.redirect(`/`)
  })

})


module.exports = router;