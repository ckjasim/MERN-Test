import { User } from "../models/inventory.model";
import { UserCreationAttributes } from "../models/User";
import { IUserService } from "./user.services.interface";

export class UserService implements IUserService {
  async findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async createUser(userData: UserCreationAttributes): Promise<User> {
    return User.create(userData);
  }

  async updateUserById(
    id: number,
    updateData: Partial<User>
  ): Promise<User | null> {
    const user = await User.findByPk(id);
    await user!.update(updateData);
    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }
}

export default new UserService();