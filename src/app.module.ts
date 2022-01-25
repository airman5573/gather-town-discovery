import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { PointTableModule } from './point-table/point-table.module';
import { PuzzleModule } from './puzzle/puzzle.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TeamPointModule } from './team-point/team-point.module';
import { TimerModule } from './timer/timer.module';
import { join } from 'path';
import { MissionUploadModule } from './mission-upload/mission-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
      serveRoot: '/public/',
    }),
    AuthModule,
    TimerModule,
    PuzzleModule,
    TeamPointModule,
    PointTableModule,
    StatisticsModule,
    MissionUploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
