import { Request, Response } from "express";
import User from "../models/users";
const { Sport, ClassTime } = require("../models/sports");
const ObjectId = require("mongoose").Types.ObjectId;

export const adminController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      const response = await user.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const response = await User.findOne({ _id: userId }).lean();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const user = await User.find().lean();
      res.status(200).json(user);
    } catch (err) {
      res.status(401);
      console.log(err);
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const filter: object = { _id: req.params.id };
      const update: object = req.body;
      const response = await User.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const id = ObjectId(userId);

      //Find user to delete
      const user = await User.findOne({ _id: userId }).lean();

      //Filter sports classes that user is enrolled into and remove him from those classes
      const userAgeClass: string = user!.ageGroup + ".class_users";
      const userSport1: string = user!.sport1;
      const userSport2: string = user!.sport2;
      const filter: object = {
        $and: [
          {
            $or: [{ sport: userSport1 }, { sport: userSport2 }],
          },
          { userAgeClass: { $in: [id] } },
        ],
      };
      const update: object = { $pull: { [userAgeClass]: userId } };

      const enrolledSports = await Sport.updateMany(filter, update);

      //Only after removing the user from sports classes delete the user itself
      const deleteUser = await User.deleteOne({ _id: userId });
      res.status(200).json({
        deleteUser,
        message: "User deleted",
      });
    } catch (err) {
      console.log(err);
    }
  },

  getSports: async (req: Request, res: Response) => {
    try {
      let response;
      if (!req.query.sports) {
        response = await Sport.find().lean();
      } else {
        let sportsList: string[] = (req.query.sports as string).split(",");
        response = await Sport.find({ sport: sportsList }).lean();
      }
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },

  updateSportClass: async (req: Request, res: Response) => {
    try {
      const newSlassSchedule = new ClassTime(req.body);
      const { sport, ageGroup, classSchedule } = req.query;

      const filter: object = { sport: sport };
      const update: object = {
        $set: { [ageGroup + "." + classSchedule]: newSlassSchedule },
      };

      const response = await Sport.findOneAndUpdate(filter, update, {
        new: true,
      }).lean();
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getFeedback: async (req: Request, res: Response) => {
    try {
      const filter: object = { sport: req.query.sport };
      const selector: any = {
        reviews: 1,
        sport: 1,
      };
      const response = await Sport.find(filter, selector).lean();
      const reviews: Array<any> = response[0]!.reviews;
      let sum: number = 0;
      for (let feedback in reviews) {
        sum += reviews[feedback].grade;
      }
      const avgGrade: number = sum / reviews.length;
      res.status(200).json({
        response,
        avgGrade,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
