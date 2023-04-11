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

app.use((req, res, next) => {
  res.locals = {
    user: req.session.sess_user
  };
  next();
});

app.get('/', (req, res) => {
  // let page = req.query.page;
  let ep = `http://localhost:4000/collections`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('allcollections', { data })
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

app.post('/collections/edit/:collectionid', (req, res) => {
  let sessionObj = req.session;

  if (sessionObj.sess_valid) {

    let c_id = req.params.collectionid
    let albumNumStartArray = req.body.albumNumStart
    let albumNumEndArray = req.body.albumNumEnd
    let userID = sessionObj.sess_user.user_id;
    console.log(userID)
    console.log(req.params.collectionid)
    console.log(req.body.albumNumStart)
    console.log(req.body.albumNumEnd)



  } else {
    res.redirect('/login')
  }

  // let user_name = req.body.username;
  // let password = req.body.password;

  // let ep = `http://localhost:4000/login`

  // axios.post(ep, querystring.stringify({ user_name, password })).then(response => {

  //   // console.log(response)

  //   let data = response.data;

  //   if (data.success) {
  //     sessionObj.sess_valid = true;
  //     sessionObj.sess_user = response.data.user;
  //     res.redirect('/')
  //   } else {
  //     res.render('login', { data })
  //   }
  // }).catch((error) => {
  //   console.log(error);
  // })
})

app.post('/login', (req, res) => {
  let sessionObj = req.session;

  let user_name = req.body.username;
  let password = req.body.password;

  let ep = `http://localhost:4000/login`

  axios.post(ep, querystring.stringify({ user_name, password })).then(response => {

    // console.log(response)

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

app.get('/logout', (req, res) => {
  delete req.session.sess_valid;
  delete req.session.sess_user
  res.redirect('/')
})

app.get('/register', (req, res) => {
  let sessionObj = req.session;

  if (sessionObj.sess_valid) {
    res.redirect('/')
  } else {
    res.render('register')
  }
})

app.get('/collections/:collectionid', (req, res) => {
  let c_id = req.params.collectionid

  let ep = `http://localhost:4000/collections/${c_id}`

  axios.get(ep).then((response) => {
    let data = response.data;

    if (data.success) {
      res.render('singleCollection', { data: data.collection })
    } else {
      res.redirect('/pageNotFound')
    }
  })
})


app.get('/addcollection', (req, res) => {
  let sessionObj = req.session

  if (sessionObj.sess_valid) {
    let ep = `http://localhost:4000/albums`

    axios.get(ep).then((response) => {
      let data = response.data;
      res.render('addCollection', { data })
    })
  } else {
    res.redirect('/login')
  }
})

app.post('/addcollection', (req, res) => {
  let sessionObj = req.session
  let collectionName = req.body.collectionname;
  let albumIDArray = req.body.album_id;
  let userID = sessionObj.sess_user.user_id;
  let apiKey = "66spev4efktkz3"

  if (sessionObj.sess_valid) {
    if (albumIDArray != null) {
      if (typeof albumIDArray === 'string') {
        albumIDArray = [albumIDArray]
      }

      let ep = `http://localhost:4000/addcollection`

      axios.post(ep, querystring.stringify({ apiKey, userID, collectionName, albumIDArray })).then(response => {

        let data = response.data;

        if (data.success) {
          res.redirect(`/collections/${data.itemsAdded.collection_id}`)
        }

      }).catch((error) => {
        console.log("Not working")
      })
    }
  }
})

app.get('/albums', (req, res) => {
  let ep = `http://localhost:4000/albums`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('allAlbums', { data })
  })
})

app.get('/albums/:albumid', (req, res) => {
  let a_id = req.params.albumid

  let ep = `http://localhost:4000/albums/${a_id}`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('singleAlbum', { data })
  })
})

app.get('/artists', (req, res) => {
  let ep = `http://localhost:4000/artists`

  axios.get(ep).then((response) => {
    let data = response.data;
    res.render('allArtists', { data })
  })
})


app.use((req, res) => {
  res.status(404).render('pageNotFound')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on: localhost: 3000");
});