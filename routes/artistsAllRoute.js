const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/artists', (req, res) => {
  let ep = `http://localhost:4000/artists`

  axios.get(ep).then((response) => {
    let responseData = response.data;
    if (responseData.success) {
      let data = responseData.data
      res.render('allArtists', { data })
    }
  })
})


module.exports = router;