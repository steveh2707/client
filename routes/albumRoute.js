const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/albums/:albumid', (req, res) => {
  let a_id = req.params.albumid
  let ep = `http://localhost:4000/albums/${a_id}`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (!responseData.success) return res.status(404).render('pageNotFound')

    let data = responseData.data
    res.render('singleAlbum', { data })

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })
})

module.exports = router;