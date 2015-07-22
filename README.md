# session-leanengine-store
Session leanengine store is a provision for storing session data in the leancloud


``` javascript 

var express = require('express');
var path = require('path');
var AV = require('leanengine');
var session = require('express-session');
var SessionLeanengineStore = require('session-leanengine-store')(session, AV);

var app = express();

var sess = {
  secret: 'WFa7Yrsizs6dh',
  saveUninitialized: true,
  name: 'av.sid',
  resave: true,
  store: new SessionLeanengineStore(session)
};

if (app.get('env') !== 'development') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

```