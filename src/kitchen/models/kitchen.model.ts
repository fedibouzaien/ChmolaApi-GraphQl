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
  
    constructor(public readonly uuid: string) {}
  
    add(input: KitchenAddInput) {
      this.name = input.name;
      this.location = input.location;
      this.status = false;
      this.address = input.address;
  
      return this;
    }
  }