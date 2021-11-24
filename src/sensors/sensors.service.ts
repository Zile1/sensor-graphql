import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSensorInput } from './dto/create-sensor.input';
import { UpdateSensorInput } from './dto/update-sensor.input';
import { Cache } from 'cache-manager';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class SensorsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async create(createSensorInput: CreateSensorInput): Promise<Sensor> {
    await this.cacheManager.set<Sensor>(`sensor/${createSensorInput.id}`, {
      temperature: createSensorInput.temperature,
    });

    return createSensorInput;
  }

  public async findAll(): Promise<Array<Sensor>> {
    const topicKeys = await this.findAllKeysInCache();
    return await this.getSensorsByKeys(topicKeys);
  }

  public async findOne(id: number): Promise<Sensor> {
    return await this.findSensorInCache(id);
  }

  public async update(
    id: number,
    updateSensorInput: UpdateSensorInput,
  ): Promise<Sensor> {
    const sensor = await this.findSensorInCache(id);
    sensor.temperature = Math.round(updateSensorInput.temperature);
    await this.cacheManager.set(`sensor/${id}`, sensor);
    return sensor;
  }

  public async remove(id: number): Promise<Sensor> {
    const sensor = await this.findSensorInCache(id);
    await this.cacheManager.del(`sensor/${id}`);
    return sensor;
  }

  private async findSensorInCache(id: number): Promise<Sensor> {
    const sensor = await this.cacheManager.get<Sensor>(`sensor/${id}`);
    if (!sensor) {
      throw new NotFoundException(`Sensor ${id} not found`);
    }
    return sensor;
  }

  private async findAllKeysInCache(): Promise<Array<string>> {
    return (await this.cacheManager.get(`sensor/keys`)) ?? [];
  }

  private async getSensorsByKeys(keys: Array<string>): Promise<Array<Sensor>> {
    const sensors: Array<Sensor> = [];
    for (const key of keys) {
      const sensor = await this.cacheManager.get<Sensor>(key);
      sensor.id = await SensorsService.getIdFromTopic(key);
      sensors.push(sensor);
    }
    return sensors;
  }

  public static async getIdFromTopic(topic: string): Promise<number> {
    const splitTopic = topic.split('/');
    return parseInt(splitTopic[1]) ?? null;
  }
}
