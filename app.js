const express = require('express')
const path = require('path');
const app = express()
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const loginRegisterLogoutRoute = require('./routes/loginRegisterLogoutRoute')

const collectionsAllRoute = require('./routes/collectionsAllRoute')
const collectionsUserRoute = require('./routes/collectionsUserRoute')
const collectionRoute = require('./routes/collectionRoute')
const collectionAddRoute = require('./routes/collectionAddRoute')
const collectionAddAlbumRoute = require('./routes/collectionAddAlbumRoute')
const collectionReorderRoute = require('./routes/collectionReorderRoute')
const collectionDeleteRoute = require('./routes/collectionDeleteRoute')
const collectionDeleteAlbumRoute = require('./routes/collectionDeleteAlbumRoute')
const commentAddRoute = require('./routes/commentAddRoute')

const albumsAllRoute = require('./routes/albumsAllRoute')
const albumRoute = require('./routes/albumRoute')
const artistsAllRoute = require('./routes/artistsAllRoute')

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
    user: req.session.sess_user,
    sess_valid: req.session.sess_valid
  };
  next();
});

app.use(loginRegisterLogoutRoute)

app.use(collectionsAllRoute)
app.use(collectionsUserRoute)
app.use(collectionRoute)
app.use(collectionAddRoute)
app.use(collectionAddAlbumRoute)
app.use(collectionReorderRoute)
app.use(collectionDeleteRoute)
app.use(collectionDeleteAlbumRoute)
app.use(commentAddRoute)

app.use(albumsAllRoute)
app.use(albumRoute)
app.use(artistsAllRoute)

app.use((req, res) => {
  res.status(404).render('pageNotFound')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server started on: localhost: 3000");
});