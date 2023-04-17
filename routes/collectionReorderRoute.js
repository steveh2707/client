const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');


router.post('/collections/reorder/:collectionid', (req, res) => {
  let sessionObj = req.session;

  if (sessionObj.sess_valid) {

    let c_id = req.params.collectionid
    let albumNumStartArray = req.body.albumNumStart
    let albumNumEndArray = req.body.albumNumEnd
    let collectionAlbumID = req.body.collectionAlbumID
    let userID = sessionObj.sess_user.user_id;

    let changes = [];

    for (let i = 0; i < albumNumStartArray.length; i++) {
      if (albumNumStartArray[i] != albumNumEndArray[i]) {
        changes.push({
          collectionAlbumID: collectionAlbumID[i],
          albumNumEnd: albumNumEndArray[i],
          userID: userID
        })
      }
    }

    let promises = []
    let responses = []

    let ep = `http://localhost:4000/reordercollection/${c_id}`

    changes.forEach(change => {
      promises.push(
        axios.post(ep, querystring.stringify(change)).then(response => {
          responses.push(response);
        })
      )
    })

    Promise.all(promises).then(() => {
      res.redirect(`/collections/${c_id}`)
    });

  } else {
    res.redirect('/login')
  }
})


module.exports = router;