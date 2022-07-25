export interface KitchenAddInput {
  name: string;

  location: {
    latitude: number;
    longitude: number;
  };

  status: boolean;

  address: {
    city: string;
    country: string;
    street: string;
    zipCode: number;
  };
}

export interface KitchenUpdateInput {
  name?: string;

  location?: {
    latitude: number;
    longitude: number;
  };

  status?: boolean;

  address?: {
    city: string;
    country: string;
    street: string;
    zipCode: number;
  };
}

export class KitchenModel {
  private name: string;

  private location: {
    latitude: number;
    longitude: number;
  };
  private status: boolean;

  private address: {
    city: string;
    country: string;
    street: string;
    zipCode: number;
  };

  private updatedAt: Date;

  constructor(public readonly uuid: string) {}

  add(input: KitchenAddInput) {
    this.name = input.name;
    this.location = input.location;
    this.status = false;
    this.address = input.address;

    return this;
  }

  update(input: KitchenUpdateInput) {
    let hasChanges = false;

    if (input.hasOwnProperty('name') && this.name !== input.name) {
      this.name = input.name;
      hasChanges = true;
    }

    if (input.hasOwnProperty('location') && this.location !== input.location) {
      this.location = input.location;
      hasChanges = true;
    }

    if (input.hasOwnProperty('status') && this.status !== input.status) {
      this.status = input.status;
      hasChanges = true;
    }

    if (input.hasOwnProperty('address') && this.address !== input.address) {
      this.address = input.address;
      hasChanges = true;
    }

    if (hasChanges) {
      this.updatedAt = new Date();
    }

    return this;
  }
}
