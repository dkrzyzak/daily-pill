import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

NestFactory.create(AppModule).then((app) => {
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.listen(process.env.PORT ?? 3000);
});
