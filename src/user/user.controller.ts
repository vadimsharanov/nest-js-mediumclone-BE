import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserService } from "./user.service";
import { Request } from "express";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { User } from "./decorators/user.decorator";
import { UserEntity } from "./user.entity";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("users")
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body("user") createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post("users/login")
  @UsePipes(new ValidationPipe())
  async login(
    @Body("user") loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
  @Get("user")
  async currentUser(
    @User("id") user: UserEntity,
    @User("id") currentUserId: number
  ): Promise<UserResponseInterface> {
    console.log("userId", currentUserId);

    return this.userService.buildUserResponse(user);
  }
}
