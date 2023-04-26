const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.get('/addcollection', (req, res) => {
  let sessionObj = req.session

  if (sessionObj.sess_valid) {
    let ep = `http://localhost:4000/albums`

    axios.get(ep).then((response) => {
      let responseData = response.data;

      if (!responseData.success) return res.redirect('/error')

      let data = responseData.data

      res.render('addCollection', { data })

    })
  } else {
    res.redirect('/login')
  }
})

router.post('/addcollection', (req, res) => {
  let sessionObj = req.session
  let collectionName = req.body.collectionname;
  let albumIDArray = req.body.album_id;
  let apiKey = "66spev4efktkz3"

  if (!sessionObj.sess_valid) return res.redirect('/login')
  if (albumIDArray === undefined) return res.redirect('/addcollection')

  let userID = sessionObj.sess_user.user_id;

  if (typeof albumIDArray === 'string') albumIDArray = [albumIDArray]

  let ep = `http://localhost:4000/addcollection`

  axios.post(ep, querystring.stringify({ apiKey, userID, collectionName, albumIDArray })).then(response => {
    let responseData = response.data;

    if (!responseData.success) return res.status(404).render('pageNotFound')

    res.redirect(`/collections/${responseData.data.collection_id}`)

  }).catch(error => {
    let message = error.message
    res.render('error', { message })
  })

})

module.exports = router;