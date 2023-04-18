const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/search', (req, res) => {
  let value = req.query.value

  let ep = `http://localhost:4000/search?value=${value}`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      let data = responseData.data
      let numResults = responseData.numResults

      res.render('searchResults', { data, numResults, value })
    }
  })
})


module.exports = router;