const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Autor = mongoose.model('autores');
const config = require('config');
let keys = config.get('jwtPrivateKey');

 const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

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