const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Author = mongoose.model('author');
const config = require('config');
let keys = config.get('jwtPrivateKey');

 const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

 module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      Author.findById(jwt_payload.id)
      .then(author => {
          if(author){
              return done(null, author);
          }
          return done(null, false);
      })
      .catch(err => console.log(err));
  }));  
};