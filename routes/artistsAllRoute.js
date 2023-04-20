const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/artists', (req, res) => {
  let ep = `http://localhost:4000/artists`

  axios.get(ep).then((response) => {
    let responseData = response.data;
    if (!responseData.success) return res.status(404).render('pageNotFound')

    let data = responseData.data
    res.render('allArtists', { data })

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })
})


module.exports = router;