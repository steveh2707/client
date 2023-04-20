const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/albums', (req, res) => {

  let albumAdded = {
    album: req.query.album,
    collection: req.query.collection
  }

  let ep = `http://localhost:4000/albums`

  axios.get(ep).then((response) => {
    let responseData = response.data;
    if (!responseData.success) return res.status(404).render('pageNotFound')

    let data = responseData.data
    res.render('allAlbums', { data, albumAdded })

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })
})

module.exports = router;