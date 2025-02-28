import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const UserId = createParamDecorator((_data: never, ctx) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const userId = request.headers['x-user-id'] as string | undefined;

    if (!userId) {
        throw new UnauthorizedException('User ID not found in request headers');
    }

    return userId;
});

export const ExtractHeader = createParamDecorator((headerName: string, ctx) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const headerValue = request.headers[headerName.toLowerCase()] as string | undefined;

    if (!headerValue) {
        throw new UnauthorizedException(`Header ${headerName} not found in request headers`);
    }

    return headerValue;
});
