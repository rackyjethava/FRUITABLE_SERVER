const passport = require('passport');
const Users = require('../model/users.model');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

const Googlelogin = async (req, res) => {
  try {

    await passport.use(new GoogleStrategy({
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_SECRET_KEY,
      callbackURL: "http://localhost:8000/api/v1/users/google/callback"
    },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        try {
          let user = await Users.findOne({ googleId: profile.id })

          console.log(user);

          if (!user) {
            user = await Users.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              role: "user"
            })
          }

          return cb(null, user)

        } catch (error) {
          return cb(error, null)
        }
      },


    ));
    passport.serializeUser(async function (user, done) {
      console.log("serializeUser", user);
      done(null, user);
    }),

      passport.deserializeUser(async function (_id, done) {
        console.log("deserializeUser", _id);
        try {
          let user = await Users.findById(_id)
          console.log(user,"deserializeUser users");

          if (!user) {
            console.log("not done");
           return done(err, null)
          }
          done(null, user)
        } catch (err) {
          done(err, null);
        }

      })

  } catch (error) {

  }
}
const facebooklogin = async (req, res) => {
  try {
    await passport.use(new FacebookStrategy({
      clientID:process.env.FACEBOOK_CLIENT_ID,
      clientSecret:process.env.FACEBOOK_SECRET_KEY,
      callbackURL: "http://localhost:8000/api/v1/users/facebook/callback"
    },
      async function (accessToken, refreshToken, public_profile, cb) {
        try {
          let user = await Users.findOne({ facebookId: public_profile.id })

          console.log(user);

          if (!user) {
            user = await Users.create({
              facebookId: public_profile.id,
              name: public_profile.displayName,
              email: public_profile.emails,
              role: "user"
            });

          }

          return cb(null, user)

        } catch (error) {
          return cb(error, null)
        }
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    ));
    passport.serializeUser(async function (user, done) {
      console.log("serializeUser", user);
      done(null, user);
    }),

      passport.deserializeUser(async function (_id, done) {
        console.log("deserializeUser", _id);
        try {
          let user = await Users.findById(_id)
          console.log(user);

          // if (!user) {
          //   console.log("not done");
          //    done(err, null)
          // }
          done(null, user)
        } catch (err) {
          done(err, null);
        }

      })
  } catch (error) {

  }
}

module.exports = {
  facebooklogin,
  Googlelogin
}





