const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.get('/collections/:collectionid', (req, res) => {
  let c_id = req.params.collectionid
  let sessionObj = req.session;

  let user_id = (sessionObj.sess_valid) ? sessionObj.sess_user.user_id : 0

  let ep = `http://localhost:4000/collections/${c_id}`

  axios.get(ep, { params: { user_id } }).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      let data = responseData.data
      res.render('singleCollection', { data })
    } else {
      res.redirect('/pageNotFound')
    }
  })
})


module.exports = router;