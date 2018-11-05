const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Autor = mongoose.model('autores');
const keys = require('../config/keys');

 const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

 module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      Autor.findById(jwt_payload.id)
      .then(autor => {
          if(autor){
              return done(null, autor);
          }
          return done(null, false);
      })
      .catch(err => console.log(err));
  }));  
};