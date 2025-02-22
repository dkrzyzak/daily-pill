import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { JwtService } from './jwt.service';
import { GoogleProfileData, GoogleTokenData } from './types';

@Injectable()
export class AuthService {
    private readonly googleClientId: string;
    private readonly googleClientSecret: string;
    private readonly googleRedirectUri: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {
        this.googleClientId =
            this.configService.get<string>('GOOGLE_CLIENT_ID') ?? '';
        this.googleClientSecret =
            this.configService.get<string>('GOOGLE_CLIENT_SECRET') ?? '';
        this.googleRedirectUri =
            this.configService.get<string>('GOOGLE_REDIRECT_URI') ?? '';
    }

    getGoogleAuthUrl(returnTo?: string) {
        const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const params = new URLSearchParams({
            client_id: this.googleClientId,
            redirect_uri: this.googleRedirectUri,
            response_type: 'code',
            scope: 'email profile',
            access_type: 'offline',
            prompt: 'consent',
        });

        if (returnTo) {
            params.append('state', Buffer.from(returnTo).toString('base64'));
        }

        return `${baseUrl}?${params.toString()}`;
    }

    async handleGoogleCallback(code: string) {
        console.log(code);
        try {
            const tokenData = await this.exchangeCodeForTokens(code);
            const userData = await this.getUserInfo(tokenData.access_token);

            // Here we'll later check the whitelist
            // For now, we'll just create a JWT

            return this.jwtService.generateJWT(userData);
        } catch {
            throw new UnauthorizedException(
                'Failed to authenticate with Google',
            );
        }
    }

    private async exchangeCodeForTokens(code: string) {
        const observableResponse = this.httpService.post<
            GoogleTokenData,
            URLSearchParams
        >(
            'https://oauth2.googleapis.com/token',
            new URLSearchParams({
                code,
                client_id: this.googleClientId,
                client_secret: this.googleClientSecret,
                redirect_uri: this.googleRedirectUri,
                grant_type: 'authorization_code',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        const response = await firstValueFrom(observableResponse);

        return response.data;
    }

    private async getUserInfo(accessToken: string) {
        const observableResponse = this.httpService.get<GoogleProfileData>(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        const response = await firstValueFrom(observableResponse);

        return response.data;
    }
}
