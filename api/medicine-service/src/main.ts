import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

NestFactory.create(AppModule).then((app) => {
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))

  console.log(process.env.PORT);

  app.listen(process.env.PORT ?? 3002);
});
