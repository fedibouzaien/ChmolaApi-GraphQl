import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import {
  KitchenCollection,
  KitchenDocument,
  KitchenSchemaName,
} from '../schemas';

import { Model } from 'mongoose';

import { KitchenModel } from '../models';

import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class KitchenRepository {
  constructor(
    @InjectModel(KitchenSchemaName)
    private readonly kitchenCollection: Model<KitchenCollection>,
  ) {}

  private static transformToDocument(model: KitchenModel): KitchenCollection {
    const kitchenPlain = instanceToPlain(model);

    delete kitchenPlain.__v;

    delete kitchenPlain._id;

    return {
      ...kitchenPlain,

      location: {
        coordinates: [
          kitchenPlain.location.latitude,

          kitchenPlain.location.longitude,
        ],
      },
    } as KitchenCollection;
  }

  transformToModel(document: KitchenDocument): KitchenModel {
    const plainDocument = document.toObject();

    const plainModel = {
      ...plainDocument,

      location: {
        latitude: plainDocument.location.coordinates[0],

        longitude: plainDocument.location.coordinates[1],
      },
    };

    // delete plainModel.__v;

    // delete plainModel._id;

    return plainToInstance(KitchenModel, plainModel);
  }

  store(kitchen: KitchenModel): Promise<void> {
    return new this.kitchenCollection(
      KitchenRepository.transformToDocument(kitchen),
    )

      .save()

      .then();
  }

  update(kitchen: KitchenModel): Promise<void> {
    const kitchenCollection = KitchenRepository.transformToDocument(kitchen);

    return this.kitchenCollection

      .updateOne({ uuid: kitchenCollection.uuid }, kitchenCollection)

      .then();
  }

  findOneByUuid(uuid: string): Promise<KitchenModel | null> {
    return this.kitchenCollection.findOne({ uuid: uuid }).then((document) => {
      if (!document) {
        return null;
      }

      return this.transformToModel(document);
    });
  }
}
