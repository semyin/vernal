import { Controller, Post, Req, Res, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(body.username, body.password);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
