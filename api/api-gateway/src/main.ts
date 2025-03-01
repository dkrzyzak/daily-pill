import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

NestFactory.create(AppModule).then((app) => {
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });

    // const config = new DocumentBuilder()
    //     .setTitle('API Gateway')
    //     .setVersion('1.0')
    //     .build();
    // const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup('/docs', app, document);

    app.listen(process.env.PORT ?? 3000);
});
