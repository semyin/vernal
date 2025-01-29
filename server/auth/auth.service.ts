import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async logout(res: Response) {
    res.clearCookie("jwt");
    return { message: "Logged out successfully" };
  }
}
