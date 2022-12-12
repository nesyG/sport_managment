import { Request, Response } from "express";
import User from "../models/users";
const { Sport } = require("../models/sports");
const ObjectId = require("mongoose").Types.ObjectId;

export const usersController = {
  createUserAsAdmin: async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      const response = await user.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getUserAsAdmin: async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id;
      const response = await User.findOne({ _id: userId }).lean();
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },

  getAllUsersAsAdmin: async (req: Request, res: Response) => {
    try {
      const user = await User.find().lean();
      res.status(200).json(user);
    } catch (err) {
      res.status(401);
      console.log(err);
    }
  },

  updateUserAsAdmin: async (req: Request, res: Response) => {
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

  deleteUserAsAdmin: async (req: Request, res: Response) => {
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
};
