import { HttpService } from '@nestjs/axios';
import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['dp_token'] as string | undefined;

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const authServiceUrl =
                this.configService.get<string>('AUTH_SERVICE_URL');

            const response = await firstValueFrom(
                this.httpService.post(`${authServiceUrl}/auth/verify`, {
                    token,
                }),
            );
            req['user'] = response.data;
            next();
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
