import { BadRequestException, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { User } from "./schemas/user.schema";
import { IUser } from "src/interfaces/interafaces";
import { AuthUserDto } from "./dto/user.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel("User") private readonly userModel: Model<User>
  ) {}
  async registerUser(user: IUser): Promise<User> {
    const userVerified = await this.userModel.findOne({ username: user.username });

    if (userVerified) {
      throw new BadRequestException("User already exists");
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    const newUser = await this.userModel.create({
      username: user.username,
      avatarUrl: "",
      password: hashedPassword,
      isOnline: false,
      lastActive: new Date(),
    });

    return newUser;
  }

  async loginUser(user: IUser): Promise<{ access_token: string; refresh_token: string }> {
    const dbUser = await this.userModel.findOne({ username: user.username });

    if (!dbUser) {
      throw new BadRequestException("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(user.password, dbUser.password);

    if (!isPasswordMatch) {
      throw new BadRequestException("Invalid credentials");
    }

    const payload = { username: dbUser.username, id: dbUser._id };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: "1d" }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: "7d" }),
    };
  }
}
