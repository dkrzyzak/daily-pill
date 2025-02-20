import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [ProxyController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/google/login', method: RequestMethod.GET },
        { path: 'auth/google/callback', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
