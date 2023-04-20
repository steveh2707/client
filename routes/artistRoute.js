const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/artists/:artistid', (req, res) => {
  let a_id = req.params.artistid

  let ep = `http://localhost:4000/artists/${a_id}`

  axios.get(ep).then((response) => {
    let responseData = response.data;
    if (!responseData.success) return res.status(404).render('pageNotFound')

    let data = responseData.data
    res.render('singleArtist', { data })

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })
})

module.exports = router;