import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Redirect,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    @Get('google/login')
    @Redirect()
    googleLogin(@Query('returnTo') returnTo?: string) {
        const googleAuthUrl = this.authService.getGoogleAuthUrl(returnTo);
        console.log('redirecting to google');

        return { url: googleAuthUrl };
    }

    @Get('google/callback')
    @Redirect()
    async googleCallback(
        @Query('code') code: string,
        @Res({ passthrough: true }) res: Response,
        @Query('state') state?: string,
    ) {
        if (!code) {
            throw new UnauthorizedException('No authorization code provided');
        }

        const jwt = await this.authService.handleGoogleCallback(code);

        res.cookie('dp_token', jwt, { httpOnly: true });

        const returnTo = state ? Buffer.from(state, 'base64').toString() : '/';

        const frontendUrl = this.configService.get<string>('FRONTEND_URL');

        return { url: `${frontendUrl}${returnTo}` };
    }

    @Post('verify')
    async verifyToken(@Body('token') token: string) {
        const result = await this.jwtService.verifyJWT(token);

        if (!result) {
            throw new UnauthorizedException(
                'Trzeba tutaj dać lepszy komunikat błędu',
            );
        }

        return result;
    }
}
