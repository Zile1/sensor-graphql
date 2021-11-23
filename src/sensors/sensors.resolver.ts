import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SensorsService } from './sensors.service';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorInput } from './dto/create-sensor.input';
import { UpdateSensorInput } from './dto/update-sensor.input';

@Resolver(() => Sensor)
export class SensorsResolver {
  constructor(private readonly sensorsService: SensorsService) {}

  @Mutation(() => Sensor)
  public async createSensor(
    @Args('createSensorInput') createSensorInput: CreateSensorInput,
  ) {
    return await this.sensorsService.create(createSensorInput);
  }

  @Query(() => Sensor, { name: 'sensor' })
  public async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.sensorsService.findOne(id);
  }

  @Mutation(() => Sensor)
  public async updateSensor(
    @Args('updateSensorInput') updateSensorInput: UpdateSensorInput,
  ) {
    return await this.sensorsService.update(
      updateSensorInput.id,
      updateSensorInput,
    );
  }

  @Mutation(() => Sensor)
  public async removeSensor(@Args('id', { type: () => Int }) id: number) {
    return await this.sensorsService.remove(id);
  }
}
