import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import Password from "../utils/password";
import {
  generateJwtAccessToken,
  generateJwtRefreshToken,
  JWTUserPayload,
  verifyJwt,
} from "../utils/jwt";
import { setCookie } from "../utils/cookie-utils";
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

// export const loginUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email } = req.body;
//     const user = await userService.findUserByEmail(email);
//     if (!user) {
//       throw new CustomError("Invalid email or password!",404);
//     }
//     const { password } = req.body;
//     console.log(password, user.password)
//     const matchPassword = await Password.compare(user.password, password);
//     if (!matchPassword) {
//       throw new CustomError("Invalid email or password!",404);
//     }

//     const payload: JWTUserPayload = {
//       id: user.id,
//       email: user.email,
//     };

//     const accessToken = generateJwtAccessToken(
//       payload,
//       process.env.JWT_ACCESS_SECRET!
//     );
//     const refreshToken = generateJwtRefreshToken(
//       payload,
//       process.env.JWT_REFRESH_SECRET!
//     );

//     setCookie(res, "accessToken", accessToken, { maxAge: 30 * 60 * 1000 });
//     setCookie(res, "refreshToken", refreshToken, {
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     sendResponse(res, HttpStatusCode.OK, "Login successfull", payload);
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// };

// export const editUser =  async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const {userId} = req.params
//     const id = Number(userId);
//     if (!id || !Number.isInteger(id)) {
//       throw new CustomError("Invalid or missing User ID",400);
//     }
    
//     const user = await userService.findUserById(id);
//     if (!user) {
//       throw new CustomError("User not found",404);
//     }
    
//     const {email} = req.body;

//     const existingUser = await userService.findUserByEmail(email);
//     if(existingUser && user.email !== existingUser?.email){
//       throw new CustomError("Email already exists",400)
//     }

//     const updateData: Partial<{ email: string;}> = {};
//     if (email) updateData.email = email;

//     const updatedUser = await userService.updateUserById(id, updateData);
//     sendResponse(res, HttpStatusCode.OK, "Updated user successfully", {id:updatedUser?.id, email: updatedUser?.email})

//   } catch (error) {
//     next(error);
//   }
// }

// export const newToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) {
//       throw new CustomError("not authorized",401);
//     }

//     const refreshSecret = process.env.JWT_REFRESH_SECRET;
//     const user = verifyJwt(refreshToken, refreshSecret!) as JWTUserPayload;
//     if (!user) {
//       throw new CustomError("forbidden",403);
//     }
//     const payload: JWTUserPayload = {
//       id: user.id,
//       email: user.email,
//     };
//     const accessSecret = process.env.JWT_ACCESS_SECRET;
//     const newAccessToken = generateJwtAccessToken(payload, accessSecret!);

//     setCookie(res, "accessToken", newAccessToken, { maxAge: 30 * 60 * 1000 });

//     sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS, { accessToken: newAccessToken });
//   } catch (error) {
//     console.log("Error in new token", error);
//     next(error);
//   }
// };