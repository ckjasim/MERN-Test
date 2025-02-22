 import mongoose from "mongoose";
import { UserAttrs, UserDoc, UserModel } from "../user.model";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    addressDuration: {
      type: String,
      required: true,
    },
    aboutYourself: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    employmentStatus: {
      type: String,
      required: true,
    },
    additionalInvestments: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc , UserModel>("User", userSchema);

export { User };