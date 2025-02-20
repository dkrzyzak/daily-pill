import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { JwtService } from './jwt.service';

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

  getGoogleAuthUrl() {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: this.googleClientId,
      redirect_uri: this.googleRedirectUri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `${baseUrl}?${params.toString()}`;
  }

  async handleGoogleCallback(code: string) {
    try {
      const tokenData = await this.exchangeCodeForTokens(code);
      console.log(tokenData);
      const userData = await this.getUserInfo(tokenData.access_token);

      // Here we'll later check the whitelist
      // For now, we'll just create a JWT

      return this.jwtService.generateJWT(userData.email);
    } catch {
      throw new UnauthorizedException('Failed to authenticate with Google');
    }
  }

  // TODO: type return value
  private async exchangeCodeForTokens(code: string) {
    const observableResponse = this.httpService.post(
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

    console.log(response);

    return response.data;
  }

  // TODO: type return value
  private async getUserInfo(accessToken: string) {
    const observableResponse = this.httpService.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const response = await firstValueFrom(observableResponse);
    console.log(response);

    return response.data;
  }
}
