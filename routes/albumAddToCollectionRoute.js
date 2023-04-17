const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.post('/addAlbumToCollection', (req, res) => {
  let sessionObj = req.session

  let collectionID = req.body.collectionID
  let albumID = req.body.albumID

  if (!sessionObj.sess_valid) return res.redirect('/login')

  let ep = `http://localhost:4000/addAlbumToCollection`

  axios.post(ep, querystring.stringify({ collectionID, albumID })).then(response => {

    let albumAdded = response.data.success;

    if (albumAdded) return res.redirect(`/albums?album=${albumID}&collection=${collectionID}`)

  }).catch((error) => {
    console.log("Not working")
  })

})

module.exports = router;