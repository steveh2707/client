const express = require('express')
const path = require('path');
const app = express()
const axios = require('axios')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  let page = req.query.page;

  let ep = `http://localhost:4000/collections`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('collections', { data })
  })
})

app.get('/collections/:collectionid', (req, res) => {

  let c_id = req.params.collectionid

  let ep = `http://localhost:4000/collections/${c_id}`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('collection', { data })
  })
})


app.get('/addcollection', (req, res) => {

  let ep = `http://localhost:4000/albums`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('addCollection', { data })
  })
})

app.post('/addcollection', (req, res) => {

  let collectionName = req.body.collectionname;
  let albumIDStringArray = req.body.album_id;

  let albumIDs = albumIDStringArray.map(Number)

  console.log(collectionName)
  console.log(albumIDs)


  let ep = `http://localhost:4000/addcollection`

  // set up api end point

  axios.post(ep).then((response) => {

    // set up success/failure view with link to created collection

  })

})

app.get('/albums', (req, res) => {

  let ep = `http://localhost:4000/albums`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('albums', { data })
  })
})


app.get('/artists', (req, res) => {

  let ep = `http://localhost:4000/artists`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('artists', { data })
  })
})


app.listen(process.env.PORT || 3000, () => {
  console.log("server started on: localhost: 3000");
});