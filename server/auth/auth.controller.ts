import { Controller, Post, Req, Res, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { APP_ENV } from "config/environments";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(body.username, body.password);

    // 解析环境变量中的过期时间
    let maxAge = 24 * 60 * 60 * 1000; // 默认1天
    const expiresIn = APP_ENV.JWT.EXPIRES_IN || '1d';    
    
    if (expiresIn.endsWith('d')) {
      // 如果是天数（例如 '1d'）
      const days = parseInt(expiresIn.slice(0, -1), 10);
      maxAge = days * 24 * 60 * 60 * 1000;
    } else if (expiresIn.endsWith('h')) {
      // 如果是小时（例如 '12h'）
      const hours = parseInt(expiresIn.slice(0, -1), 10);
      maxAge = hours * 60 * 60 * 1000;
    } else if (expiresIn.endsWith('m')) {
      // 如果是分钟（例如 '30m'）
      const minutes = parseInt(expiresIn.slice(0, -1), 10);
      maxAge = minutes * 60 * 1000;
    } else if (expiresIn.endsWith('s')) {
      // 如果是秒（例如 '60s'）
      const seconds = parseInt(expiresIn.slice(0, -1), 10);
      maxAge = seconds * 1000;
    }

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge, // 使用环境变量中的过期时间
    });

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);
    return null;
  }
}
