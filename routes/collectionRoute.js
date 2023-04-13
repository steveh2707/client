const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/collections/:collectionid', (req, res) => {
  let c_id = req.params.collectionid

  let ep = `http://localhost:4000/collections/${c_id}`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      let data = responseData.data
      res.render('singleCollection', { data })
    } else {
      res.redirect('/pageNotFound')
    }
  })
})


module.exports = router;