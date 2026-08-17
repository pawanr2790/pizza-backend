import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/user/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          authProvider: "google",
          providerId: profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        if (!email) {
          return done(null, false, {
            message: "Google account does not have an email",
          });
        }

        const newUser = await User.create({
          name,
          email,
          role: "user",
          authProvider: "google",
          providerId: profile.id,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
