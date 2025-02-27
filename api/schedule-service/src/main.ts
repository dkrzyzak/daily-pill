import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';
import cookieParser from 'cookie-parser';

NestFactory.create(AppModule).then((app) => {
  app.use(cookieParser());
  app.listen(process.env.PORT ?? 3003);
});
