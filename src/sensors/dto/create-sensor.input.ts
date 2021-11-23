import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSensorInput {
  @Field(() => Int, { description: 'Sensor id', nullable: true })
  id: number;

  @Field(() => Float, { description: 'Sensor temperature value' })
  temperature: number;
}
