const express = require('express')
const path = require('path');
const app = express()
const axios = require('axios')
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const querystring = require('querystring');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

const hour = 1000 * 60 * 60 * 1;

app.use(sessions({
  secret: "letmein12356",
  saveUninitialized: true,
  cookie: { maxAge: hour },
  resave: false
}));

app.get('/', (req, res) => {

  let sessionObj = req.session

  console.log(sessionObj)

  // let page = req.query.page;

  let ep = `http://localhost:4000/collections`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('collections', { data, user: sessionObj.sess_user })
  })
})

app.get('/login', (req, res) => {
  let sessionObj = req.session;
  if (sessionObj.sess_valid) {
    res.redirect('/')
  } else {
    res.render('login')
  }

})

app.post('/login', (req, res) => {

  let sessionObj = req.session;

  let user_name = req.body.username;
  let password = req.body.password;

  let ep = `http://localhost:4000/login`

  axios.post(ep, querystring.stringify({ user_name, password })).then(response => {

    console.log(response)

    let data = response.data;

    if (data.success) {
      sessionObj.sess_valid = true;
      sessionObj.sess_user = response.data.user;
      res.redirect('/')
    } else {
      res.render('login', { data })
    }

  }).catch((error) => {
    console.log(error);
  })


})


app.get('/register', (req, res) => {

  let ep = `http://localhost:4000/albumart`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('register', { data })
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
  let user_id = req.session.sess_user.user_id;

  if (albumIDStringArray != null) {

    let albumIDs;

    if (typeof albumIDStringArray === 'string') {
      albumIDs = [Number(albumIDStringArray)]
    } else {
      albumIDs = albumIDStringArray.map(Number)
    }
    console.log(user_id)
    console.log(collectionName)
    console.log(albumIDs)


    let ep = `http://localhost:4000/addcollection`

    // set up api end point

    // axios.post(ep).then((response) => {

    //   // set up success/failure view with link to created collection

    // })
  }
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