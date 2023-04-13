const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/users/:userid', (req, res) => {
  let u_id = req.params.userid;

  let ep = `http://localhost:4000/users/${u_id}`

  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      let data = responseData.data
      res.render('userCollections', { data })
    }
  })
})


module.exports = router;