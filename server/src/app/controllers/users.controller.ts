import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import Password from "../utils/password";
import { CommonMessages, HttpStatusCode, sendResponse } from "../utils/send-response";
import { CustomError } from "../utils/custom-error";

export const verifyExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email,mobile } = req.body;
    const existingUser = await userService.findUserByEmailOrMobile(email,mobile);
    if (existingUser) {
      throw new CustomError("User already exists in this email or mobile number !", 400);
    }else{
       sendResponse(res, HttpStatusCode.CREATED, CommonMessages.VERIFIED)
    }
  } catch (error) {
    next(error);
  }
};
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email,mobile,password } = req.body.signup;
    const { title,fullName,dateOfBirth,currentAddress,addressDuration,aboutYourself } = req.body.personal;
    const { employmentStatus,additionalInvestments } = req.body.financial;

    const existingUser = await userService.findUserByEmailOrMobile(email,mobile);
    if (existingUser) {
      throw new CustomError("User already exists in this email or mobile number !", 400);
    }

    const hashedPassword = await Password.toHash(password);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
      mobile,
      title,
      fullName,
      dateOfBirth,
      currentAddress,
      addressDuration,
      aboutYourself,
      employmentStatus,
      additionalInvestments
    });
    sendResponse(res, HttpStatusCode.CREATED, CommonMessages.CREATED, {
      id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const userData = await userService.findUserById(id);
    if (userData) {
      sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, userData);
    }else{
      throw new CustomError("Invalid Link", 400);
    }
  } catch (error) {
    next(error);
  }
};
