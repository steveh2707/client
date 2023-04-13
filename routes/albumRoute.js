const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/albums/:albumid', (req, res) => {
  let a_id = req.params.albumid

  let ep = `http://localhost:4000/albums/${a_id}`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      let data = responseData.data
      res.render('singleAlbum', { data })
    }
  })
})

module.exports = router;