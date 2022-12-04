const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/users");
require("dotenv").config({ path: "./config/.env" });

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport: any) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
      try {
        console.log(jwt_payload.id);
        const findUser = await User.findById(jwt_payload.id);
        if (findUser) return done(null, findUser);
        return done(null, false);
      } catch (err) {
        if (err) return done(err, false, { message: "Server Error" });
      }
    })
  );
};
