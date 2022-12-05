import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/users";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function (passport: any) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email: string,
      password: string,
      done: any
    ) {
      User.findOne(
        { email: email.toLowerCase() },
        function (err: Error, user: any) {

          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            return done(null, false, {
              msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }
          user.comparePassword(password, function (err: Error, isMatch: any) {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { msg: "Invalid email or password." });
          });
        }
      );
    })
  );

  const opts: object = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
      try {
        console.log(jwt_payload.id);
        const findUser = await User.findById(jwt_payload.id);
        if (findUser) {
          return done(null, findUser);
        }
        return done(null, false);
      } catch (err) {
        if (err) return done(err, false, { message: "Server Error" });
      }
    })
  );
};
