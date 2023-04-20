const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.post('/collectionAddAlbum', (req, res) => {
  let sessionObj = req.session

  if (!sessionObj.sess_valid) return res.redirect('/login')

  let collectionID = req.body.collectionID
  let albumID = req.body.albumID
  let userID = sessionObj.sess_user.user_id

  let ep = `http://localhost:4000/collectionAddAlbum`

  axios.post(ep, querystring.stringify({ collectionID, albumID, userID })).then(response => {
    let responseData = response.data;
    if (!responseData.success) return res.status(404).render('pageNotFound')

    res.redirect(`/albums?album=${albumID}&collection=${collectionID}`)

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })

})

module.exports = router;