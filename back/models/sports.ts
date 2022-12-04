import mongoose, { Schema, Types } from "mongoose";

//INTERFACES

/**
 * @openapi
 * components:
 *  schemas:
 *    ClassTimeSchema:
 *      type: object
 *      required:
 *       - day
 *       - start
 *       - end
 *      properties:
 *       day:
 *        type: string,
 *        default: Monday
 *       start:
 *        type: string,
 *        default: 10:30
 *       end:
 *        type: string,
 *        default: 11:30
 */

 export interface IClassFeedback {
  userid: Types.ObjectId;
  comment: string;
  grade: number;
}

export interface IClassTime {
  day: string;
  start: string;
  end: string;
}

export interface ISportsClasses {
  sport: string;
  children: {
    class_users: [Types.ObjectId];
    t1: IClassTime;
    t2: IClassTime;
    t3: IClassTime;
  };
  youth: {
    class_users: [Types.ObjectId];
    t1: IClassTime;
    t2: IClassTime;
    t3: IClassTime;
  };
  youngAdults: {
    class_users: [Types.ObjectId];
    t1: IClassTime;
    t2: IClassTime;
    t3: IClassTime;
  };
  adults: {
    class_users: [Types.ObjectId];
    t1: IClassTime;
    t2: IClassTime;
    t3: IClassTime;
  };
  reviews: [IClassFeedback];
}

//SCHEMAS

const ClassFeedbackSchema = new Schema<IClassFeedback>({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  comment: { type: String, required: true, default: "Good class" },
  grade: { type: Number, required: true, default: 5 },
});

const ClassTimeSchema = new Schema<IClassTime>({
  day: { type: String, default: "" },
  start: { type: String, default: "" },
  end: { type: String, default: "" },
});

const SportsClassesSchema = new Schema<ISportsClasses>({
  sport: { type: String, required: true },
  children: {
    class_users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    t1: ClassTimeSchema,
    t2: ClassTimeSchema,
    t3: ClassTimeSchema,
  },
  youth: {
    class_users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    t1: ClassTimeSchema,
    t2: ClassTimeSchema,
    t3: ClassTimeSchema,
  },
  youngAdults: {
    class_users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    t1: ClassTimeSchema,
    t2: ClassTimeSchema,
    t3: ClassTimeSchema,
  },
  adults: {
    class_users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    t1: ClassTimeSchema,
    t2: ClassTimeSchema,
    t3: ClassTimeSchema,
  },
  reviews: [ClassFeedbackSchema],
});

//Export models

const sportsClasses = mongoose.model<ISportsClasses>(
  "SportsClasses",
  SportsClassesSchema
);

const reviews = mongoose.model<IClassFeedback>(
  "ClassFeedback",
  ClassFeedbackSchema
);

const classTime = mongoose.model<IClassTime>(
  "ClassTime",
  ClassTimeSchema
);

module.exports = {
  Sport: sportsClasses,
  Reviews: reviews,
  ClassTime: classTime
};
