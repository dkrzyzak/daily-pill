import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

NestFactory.create(AppModule).then((app) => {
  app.use(cookieParser());
  // app.enableCors({
  //   origin: process.env.FRONTEND_URL,
  //   credentials: true, // Important!
  // });
  app.listen(process.env.PORT ?? 3000);
});
