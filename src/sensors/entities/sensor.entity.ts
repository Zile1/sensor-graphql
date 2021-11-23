import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class Sensor {
  @Field(() => Int, { description: 'Sensor id', nullable: true })
  id?: number;

  @Field(() => Float, { description: 'Sensor temperature value' })
  temperature: number;
}
