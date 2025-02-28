import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineModule } from './medicine/medicine.module';
import { MedicineDataSource } from './data-source';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(MedicineDataSource.options),
        HttpModule,
        MedicineModule,
    ],
})
export class AppModule {}
