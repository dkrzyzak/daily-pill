import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignJWT, jwtVerify, JWTVerifyResult } from 'jose';

interface TokenPayload {
  email: string;
}

type VerifiedToken = JWTVerifyResult<TokenPayload>;

@Injectable()
export class JwtService {
  JWT_SECRET: string;
  ISSUER = 'daily_pill';
  AUDIENCE = 'daily_pill';

  constructor(private readonly configService: ConfigService) {
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET')!;
  }

  async generateJWT(googleEmail: string) {
    return new SignJWT({
      email: googleEmail,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1 year')
      .setIssuer(this.ISSUER)
      .setAudience(this.AUDIENCE)
      .sign(new TextEncoder().encode(this.JWT_SECRET));
  }

  async verifyJWT(token: string): Promise<VerifiedToken['payload'] | null> {
    try {
      const verified = await jwtVerify<TokenPayload>(
        token,
        new TextEncoder().encode(this.JWT_SECRET),
        {
          issuer: this.ISSUER,
          audience: this.AUDIENCE,
        },
      );

      return verified.payload;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // actual business logic for validating JWT
  async validateJWT(token: string) {
    const tokenValue = await this.verifyJWT(token);

    if (!tokenValue || !tokenValue.email) {
      return false;
    }

    // TODO: add email whitelisting
    // if (!WHITELISTED_EMAILS.includes(tokenValue?.email)) {
    //   return false;
    // }

    return true;
  }
}
