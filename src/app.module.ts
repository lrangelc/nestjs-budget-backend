/* eslint-disable hexagonal-architecture/enforce */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,

    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postres',
    //   database: 'task-management',
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
