import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';

NestFactory.create(AppModule).then((app) => {
  app.listen(process.env.PORT ?? 3001);
});
