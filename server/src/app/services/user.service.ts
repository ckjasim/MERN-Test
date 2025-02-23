
import { User } from "../models/schema/User";
import { UserAttrs, UserDoc } from "../models/user.model";
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService {
  async findUserByEmailOrMobile(email: string, mobile: string): Promise<UserDoc | null> {
    const user = await User.findOne({
      $or: [{ email }, { mobile }]
    });
    return user;
  }
  async createUser(attrs: UserAttrs): Promise<UserDoc> {
    return await User.build(attrs).save();
  }
  async findUserById(id: string): Promise<UserDoc | null> {
    const user = await User.findOne({_id:id});
    return user;
  }
}

export default new UserService();