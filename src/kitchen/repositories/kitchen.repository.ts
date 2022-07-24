import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KitchenCollection, KitchenSchemaName } from '../schemas';
import { Model } from 'mongoose';
import { KitchenModel } from '../models';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class KitchenRepository {
  
  constructor(
    @InjectModel(KitchenSchemaName)
    private readonly kitchenCollection: Model<KitchenCollection>,
  ) {}

  store(kitchen: KitchenModel): Promise<void> {
    let kitchenCollection = instanceToPlain(kitchen);

    kitchenCollection = {
      ...kitchenCollection,
      location: {
        coordinates: [
          kitchenCollection.location.latitude,
          kitchenCollection.location.longitude,
        ],
      },
    };

    return new this.kitchenCollection(kitchenCollection).save().then((res) => {
      console.log(res);
    });
  }
}