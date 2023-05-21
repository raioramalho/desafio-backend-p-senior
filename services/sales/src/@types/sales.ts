import { Sales } from '@prisma/client';

export class SalesType implements Sales {
  id: number;
  uuid: string;
  service_key: string;
  buyerEmail: string;
  productId: string;
  created_at: Date;
  updated_at: Date;

  constructor(sale: Sales) {
    this.id = sale.id;
    this.uuid = sale.uuid;
    this.service_key = sale.service_key;
    this.productId = sale.productId;
    this.buyerEmail = sale.buyerEmail;
  }

  // You can also add any additional methods or functionality specific to SalesType class here
  getUUID() {
    return this.uuid;
  }

  getID() {
    return this.id;
  }
}
