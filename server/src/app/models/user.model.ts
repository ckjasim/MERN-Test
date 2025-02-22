import mongoose from "mongoose";

export interface UserAttrs{
    email: string;
    mobile: string;
    password: string;
    title:string;
    fullName: string;
    dateOfBirth: string;
    currentAddress: string;
    addressDuration: string;
    aboutYourself: string;
    employmentStatus: string;
    additionalInvestments: string;
}

export interface UserDoc extends mongoose.Document{
    id: string;
    email: string;
    mobile: string;
    password: string;
    title:string;
    fullName: string;
    dateOfBirth: string;
    currentAddress: string;
    addressDuration: string;
    aboutYourself: string;
    employmentStatus: string;
    additionalInvestments: string;
}  

export interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc
}