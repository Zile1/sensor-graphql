import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { SensorsModule } from './sensors/sensors.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    SensorsModule,
    CacheModule.register<RedisClientOpts>({
      isGlobal: true,
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
      ttl: 1000,
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        debug: true,
        playground: true,
      }),
    }),
  ],
})
export class AppModule {}
