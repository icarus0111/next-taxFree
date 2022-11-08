require('dotenv').config();

const express = require("express");
const next = require("next");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const compression= require('compression')
const port =process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const nodemailer = require('nodemailer')
const mongoose = require('mongoose');
const route = require('./route')
const mongoURL = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const User =require('./model/user')

const sitemapOptions = {
    root: __dirname + '/../static/sitemap/',
    headers: {
        'Content-Type': 'text/xml;charset=UTF-8'
    }
};

mongoose.connect(
  mongoURL,
  { useNewUrlParser: true,
    useUnifiedTopology:true
   }
);

app.prepare().then(() => {
  const server = express();

  server.use(compression());
  server.use(helmet());
  server.use(express.json({limit:'50mb'}));
  server.use(express.urlencoded({ extended: false,limit:'50mb' }));
  server.use(cookieParser());


  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, maxAge: 2419200000 },
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );


  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  server.use((req, res, next) => {
    // console.log(req.user,"USEEEEERRRRR")
    next();
  });


  server.use('/', route);

  server.get('/oauth/callback',(req,res)=>{
    res.sendStatus(200)
  })

  server.post('/oauth/callback',(req,res)=>{
   res.sendStatus(200)
  })

  server.get('/sitemap.xml', (req, res) => res.status(200).sendFile('sitemap.xml', sitemapOptions));


  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
