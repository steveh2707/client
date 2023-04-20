const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/search', (req, res) => {
  let value = req.query.value

  let ep = `http://localhost:4000/search?value=${value}`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (!responseData.success) return res.redirect('/error')

    let data = responseData.data
    let numResults = responseData.numResults

    res.render('searchResults', { data, numResults, value })

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })
})


module.exports = router;