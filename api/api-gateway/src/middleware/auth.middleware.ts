import { HttpService } from '@nestjs/axios';
import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

export class AuthMiddleware implements NestMiddleware {
   constructor(
      private readonly httpService: HttpService,
      private readonly configService: ConfigService
   ) {}
   
   async use(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
         throw new UnauthorizedException('No token provided');
      }

      try {
         const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');

         const response = await firstValueFrom(this.httpService.post(`${authServiceUrl}/auth/verify`, { token }));
         req['user'] = response.data;
         next();
      } catch {
         throw new UnauthorizedException('Invalid token');
      }
   }
}