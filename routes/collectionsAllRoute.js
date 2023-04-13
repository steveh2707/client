const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', (req, res) => {
  // let page = req.query.page;
  let ep = `http://localhost:4000/collections`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      let data = responseData.data
      res.render('allcollections', { data })
    }
  })
})

module.exports = router;