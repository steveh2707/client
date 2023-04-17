const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.post('/collectionDeleteAlbum', (req, res) => {
  let sessionObj = req.session

  if (!sessionObj.sess_valid) return res.redirect('/login')

  let collectionID = req.body.collectionID
  let albumID = req.body.albumID
  let userID = sessionObj.sess_user.user_id

  let ep = `http://localhost:4000/collectionDeleteAlbum`

  axios.post(ep, querystring.stringify({ collectionID, albumID, userID })).then(response => {

    res.redirect(`/collections/${collectionID}`)

  }).catch((error) => {
    console.log(error)
  })

})

module.exports = router;