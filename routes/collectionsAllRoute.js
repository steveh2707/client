const express = require('express')
const router = express.Router()
const axios = require('axios')
const querystring = require('querystring');

router.get('/', (req, res) => {
  let page = req.query.page || 1;

  let sortQuery = req.query.sort

  let currentSort = ""
  let otherSortOptions = []

  let editedSort = { name: "Last Edited", link: "edit" }
  let likesSort = { name: "Likes", link: "likes" }
  let commentSort = { name: "Comments", link: "comments" }

  if (sortQuery === "likes") {
    currentSort = likesSort
    otherSortOptions.push(editedSort, commentSort)
  } else if (sortQuery === "comments") {
    currentSort = commentSort
    otherSortOptions.push(editedSort, likesSort)
  } else {
    sortQuery = "edit"
    currentSort = editedSort
    otherSortOptions.push(likesSort, commentSort)
  }

  let ep = `http://localhost:4000/collections?page=${page}&sort=${sortQuery}`


  axios.get(ep).then((response) => {
    let responseData = response.data;

    if (responseData.success) {
      // let data = responseData.data
      res.render('allcollections', { responseData, currentSort, otherSortOptions })
    }
  })
})

module.exports = router;