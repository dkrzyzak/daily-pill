import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { All, Controller, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller()
export class ProxyController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const targetUrl = this.getServiceUrl(req.path);

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method,
          url: `${targetUrl}${req.path}`,
          data: req.body,
          headers: {
            ...req.headers,
            host: undefined,
          },
        }),
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        return res.status(error.response?.status || 500).json(
          error.response?.data || {
            message: 'Internal server error',
          },
        );
      }

      res.status(500).json({ message: 'Internal server error' });
    }
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

    throw new Error('Unknown service');
  }
}
