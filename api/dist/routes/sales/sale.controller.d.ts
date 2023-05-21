/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { Request } from 'express';
export default class SalesController implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
    private client;
    bufferize(data: any): Buffer;
    newSale(data: any, request: Request): Promise<any>;
    listSales(request: Request): Promise<any>;
    cancelSale(body: any, request: Request): Promise<any>;
}
