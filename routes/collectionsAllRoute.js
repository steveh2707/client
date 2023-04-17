const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.get('/', (req, res) => {
  let page = req.query.page || 1;

  console.log(page)

  let ep = `http://localhost:4000/collections?page=${page}`

  // axios.post(ep, querystring.stringify({ c_id, comment_message, user_id })).then(response => {

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      // let data = responseData.data
      res.render('allcollections', { responseData })
    }
  })
})

module.exports = router;