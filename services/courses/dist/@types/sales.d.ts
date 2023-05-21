import { Sales } from '@prisma/client';
export declare class SalesType implements Sales {
    id: number;
    uuid: string;
    service_key: string;
    buyerEmail: string;
    productId: string;
    created_at: Date;
    updated_at: Date;
    constructor(sale: Sales);
    getUUID(): string;
    getID(): number;
}
