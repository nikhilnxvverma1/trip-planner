var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('./models/user.model.js');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
      clientID: "794044533043-ufs6rqkr2g679l2slv4molj0mc86u0hg.apps.googleusercontent.com",
      clientSecret: "siPHA1LniIfO7XerH71SSNcN",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        if(err)
          return done;
        if(user){
          return done(null, user);
        } else {
          console.log(profile);
          var newUser = User();
          newUser.displayName = profile.displayName;
          newUser.googleId = profile.id;
          newUser.save(function(err){
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    }
));
var isAuthentic;
var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));
app.use('/', express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "tom",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
var sess;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Cat = require('./models/cat.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
     function(req, res) {
        //Successful authentication, redirect home.
       isAuthentic = true;
       res.redirect('/protected');
  });

  // APIs
  app.get('/cats', function(req, res) {
    Cat.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/cats/count', function(req, res) {
    Cat.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/cat', function(req, res) {
    var obj = new Cat(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/cat/:id', function(req, res) {
    Cat.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/cat/:id', function(req, res) {
    Cat.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/cat/:id', function(req, res) {
    Cat.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });

  app.get('/protected', function(req, res) {
    if(isAuthentic)
    {
      res.send("access granted. secure stuff happens here");
    } else {
      res.send("cant provide access");
    }
  });

  app.get('/logout', function(req, res){
    isAuthentic = false;
    res.send("Logged Out");
  });

  app.get('/getLatLong', function(req, res){
    var location = req.query.location;
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
      host: 'maps.googleapis.com',
      path: '/maps/api/geocode/json?address='+location
    };
    callback = function(response) {
      var str = '';
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });
      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        var parsedString = JSON.parse(str);
        var latLong = parsedString.results[0].geometry.location;
        res.json(latLong);
      });
    }
    http.request(options, callback).end();
  });

  app.get('/findplaces', function(req, res){
    var lat = req.query.lat;
    var long = req.query.long;
    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
      host: 'api.tripadvisor.com',
      path: '/api/partner/2.0/map/'+lat+','+long+'?key=2224bfda-c43d-4413-9c1d-74d252a545f3',
    };
    callback = function(response) {
      var str = '';
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });
      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        var parsedString = JSON.parse(str);
        res.json(parsedString);
      });
    }
    http.request(options, callback).end();
  });

  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});

module.exports = app;