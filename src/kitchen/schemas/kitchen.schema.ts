import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type KitchenDocument = KitchenCollection & Document;

export const KitchenSchemaName = 'Kitchen';

@Schema({ _id: false })
class Address {
  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  street: string;

  @Prop()
  zipCode: number;
}

@Schema({ _id: false })
export class GeoPoint {
  @Prop({ default: 'Point' })
  type?: string;

  @Prop({ required: true })
  coordinates: number[];
}

@Schema()
export class KitchenCollection {
  @Prop({ type: Types.ObjectId })
  uuid: string;

  @Prop()
  name: string;

  @Prop({ type: GeoPoint })
  location: GeoPoint;

  @Prop()
  status: boolean;

  @Prop({ type: Address })
  address: Address;
}

const KitchenSchema = SchemaFactory.createForClass(KitchenCollection);

export const KitchenSchemaDefinition: ModelDefinition = {
  name: KitchenSchemaName,
  schema: KitchenSchema,
};