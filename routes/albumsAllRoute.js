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

    if (responseData.success) {
      let data = responseData.data
      res.render('allAlbums', { data, albumAdded })
    }
  })
})

module.exports = router;