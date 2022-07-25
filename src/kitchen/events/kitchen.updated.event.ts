import { KitchenModel } from '../models';

export class KitchenUpdatedEvent {
  constructor(public readonly kitchen: KitchenModel) {}
}
