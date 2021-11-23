import { CreateSensorInput } from './create-sensor.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSensorInput extends CreateSensorInput {}
