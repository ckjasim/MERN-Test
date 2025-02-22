
import { User } from "../models/schema/User";
// import { UserCreationAttributes } from "../models/User";
import { UserDoc } from "../models/user.model";
import { IUserService } from "./user.service.interface";


export class UserService implements IUserService {
  
  async findUserByEmailOrMobile(email: string, mobile: string): Promise<UserDoc | null> {
    const user = await User.findOne({
      $or: [{ email }, { mobile }]
    });
    return user;
  }
  
  

  // async createUser(userData: UserCreationAttributes): Promise<User> {
  //   return User.create(userData);
  // }

  // async updateUserById(
  //   id: number,
  //   updateData: Partial<User>
  // ): Promise<User | null> {
  //   const user = await User.findByPk(id);
  //   await user!.update(updateData);
  //   return user;
  // }

  // async findUserById(id: number): Promise<User | null> {
  //   return User.findByPk(id);
  // }

  // async getAllUsers(): Promise<User[]> {
  //   return User.findAll();
  // }
}

export default new UserService();