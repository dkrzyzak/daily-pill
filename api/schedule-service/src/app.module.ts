import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule/schedule.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                url: process.env.POSTGRES_URL,
                entities: [Schedule],
                synchronize: true,
            }),
        }),
        HttpModule,
        ScheduleModule,
    ],
})
export class AppModule {}
