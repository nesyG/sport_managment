import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

/**
 * @openapi
 * components:
 *  schemas:
 *    UsersSchema:
 *      type: object
 *      required:
 *       - firstName
 *       - lastName
 *       - email
 *       - password
 *       - ageGroup
 *       - isVerified
 *      properties:
 *       firstName:
 *        type: string,
 *        default: Jane
 *       lastName:
 *        type: string,
 *        default: Doe
 *       email:
 *        type: string,
 *        default: jane.doe@gmail.com
 *       password:
 *        type: string,
 *        default: something123
 *       ageGroup:
 *        type: string,
 *        default: children
 *       isVerified:
 *        type: boolean,
 *        default: false
 */

export interface IUsers {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ageGroup: string;
  sport1: string;
  sport2: string;
  isVerified: boolean;
  uniqueString: string;
  isAdmin: boolean;
}

const UsersSchema = new Schema<IUsers>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String
  },
  sport1: { type: String, default: "" },
  sport2: { type: String, default: "" },
  isVerified: { type: Boolean, default: false, required: true },
  uniqueString: {
    type: String,
  },
  isAdmin: { type: Boolean, default: false },
});

// Password hash middleware

UsersSchema.pre("save", async function (next) {
  // check if password is present and is modified.
  try {
    if (this.password && this.isModified("password" as string)) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    console.log(err);
  }
});


// Helper method for validating users password
UsersSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string,
  cb: Function
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

//Generate jwt
UsersSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
  };
  console.log(payload)
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export default mongoose.model<IUsers>("User", UsersSchema);
