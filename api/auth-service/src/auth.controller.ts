import { Body, Controller, Get, Post, Query, Redirect, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Get('google/login')
  @Redirect()
  googleLogin() {
    const googleAuthUrl = this.authService.getGoogleAuthUrl();

    return { url: googleAuthUrl };
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string) {
    if (!code) {
      throw new UnauthorizedException('No authorization code provided');
    }

    const jwt = await this.authService.handleGoogleCallback(code);

    // TODO: set token as a http only cookie

    return jwt;
  }

  @Post('verify')
  async verifyToken(@Body('token') token: string) {
    const result = await this.jwtService.verifyJWT(token);

    if (!result) {
      throw new UnauthorizedException('Trzeba tutaj dać lepszy komunikat błędu'); 
    }

    return result.email;
  }
}