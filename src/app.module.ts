import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from 'src/domain/domain.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [DomainModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
