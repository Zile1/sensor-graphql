import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsResolver } from './sensors.resolver';

@Module({
  providers: [SensorsResolver, SensorsService],
})
export class SensorsModule {}
