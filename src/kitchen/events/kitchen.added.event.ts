import { KitchenModel } from '../models';

export class KitchenAddedEvent {
  constructor(public readonly kitchen: KitchenModel) {}
}
