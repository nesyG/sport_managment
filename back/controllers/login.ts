import { NextFunction, Request, Response } from "express";
import validator from "validator";
import passport from "passport";
import User from "../models/users";
import nodemailer from "nodemailer";
const jwt = require("jsonwebtoken");

//Use .env file in config folder
require("dotenv").config({ path: "../config/.env" });

export const loginController = {
  postRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new User(req.body);
      const validationErrors: Array<{ msg: string }> = [];

      if (!validator.isEmail(req.body.email)) {
        validationErrors.push({ msg: "Please enter a valid email address." });
      }

      if (!validator.isLength(req.body.password, { min: 8 })){
        validationErrors.push({
          msg: "Password must be at least 8 characters long",
        });
      }

      if (req.body.password !== req.body.confirmPassword) {
        validationErrors.push({ msg: "Passwords do not match" });
      }

      if (validationErrors.length) {
        return res.status(400).json({ validationErrors: validationErrors });
      }
      const normEmail = validator.normalizeEmail(newUser.email, {
        gmail_remove_dots: false,
      });

      newUser.email = normEmail as string;

      //nodemailer gmail verification

      // 1. Function to create randomized str
      const randomizeStr = () => {
        const strLength = 10;
        let randomStr = "";
        for (let i = 0; i <= 10; i++) {
          const char = Math.floor(Math.random() * 10 + 1);
          randomStr += char;
        }
        return randomStr;
      };

      const uniqueString: string = randomizeStr();


      // 1.5 Save user with registration email and uniqueString
      newUser.uniqueString = uniqueString
      const savedUser = await newUser.save();

      // 2. Create nodemailer function for sending email
      const sendMail = async (email: string, uniqueString: string) => {
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PSW,
          },
        });

        // 3. Define sending options
        const mailOptions = {
          from: "Sport Arena Managment <howyesno040@gmail.com>",
          to: email,
          subject: "Email confirmation",
          html: `Welcome to Sport Arena! Please follow the instructions and login after verifying your email. Click <a href=http://localhost:3500/api/verify/${uniqueString}> here </a> to verify your email.`,
        };
        //4. Function to send the mail
        transporter.sendMail(mailOptions);
      };

      sendMail(newUser.email, uniqueString);

      // (user: any) => res.json({ token: user.generateJWT(), user: savedUser });
      res.status(200).json({
        savedUser,
        message: `User created, verification email sent to ${newUser.email}`,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  verifyEmail: async (req: Request, res: Response) => {
    try {
      //Find user by generated unique string
      const uniqueString = req.params.uniqueString;
      const user = await User.findOne({ uniqueString: uniqueString });

      if (!user) {
        return res.status(400).json("User not found");
      }

      //If not admin, save and verify user as regular user
      user!.isVerified = true;
      await user!.save();
      res.status(200).json({message: "Account verified."});
    } catch (err) {
      console.log(err);
    }
  },

  postLogin: async (req: Request, res: Response, next: any) => {
    //Namjestiti da pogleda ako mail tj korisnik postoji u bazi

    passport.authenticate(
      "local",
      { session: false },
      function (err: Error, user: any) {
        if (err) {
          return next(err);
        }
        if (!user) {
        }
        req.logIn(user, { session: false }, (err) => {
          if (err) {
            return next(err);
          }
          res.status(200).json({ token: user.generateJWT(), user: user });
        });
      }
    )(req, res, next);
  },
};
