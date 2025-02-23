import { All, Controller, NotFoundException, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

@Controller()
export class ProxyController {
    private proxyMiddleware: RequestHandler<Request, Response>;

    constructor(private readonly configService: ConfigService) {
        this.proxyMiddleware = createProxyMiddleware<Request, Response>({
            router: (req) => {
                return this.getServiceUrl(req.path);
            },
            changeOrigin: true,
        });
    }

    @All('*')
    async proxy(@Req() req: Request, @Res() res: Response) {
        this.proxyMiddleware(req, res, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Proxy error' });
            }
        });
    }

    private getServiceUrl(path: string): string {
        if (path.startsWith('/auth')) {
            return this.configService.get<string>('AUTH_SERVICE_URL')!;
        }

        if (path.startsWith('/medicines')) {
            return this.configService.get<string>('MEDICINE_SERVICE_URL')!;
        }

        if (path.startsWith('/schedules')) {
            return this.configService.get<string>('SCHEDULE_SERVICE_URL')!;
        }

        throw new NotFoundException('Unknown service');
    }
}
