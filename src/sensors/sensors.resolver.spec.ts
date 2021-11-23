import { Test, TestingModule } from '@nestjs/testing';
import { SensorsResolver } from './sensors.resolver';
import { SensorsService } from './sensors.service';

describe('SensorsResolver', () => {
  let resolver: SensorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsResolver, SensorsService],
    }).compile();

    resolver = module.get<SensorsResolver>(SensorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
