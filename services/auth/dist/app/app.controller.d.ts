/// <reference types="node" />
import { AppService } from './app.service';
import { Buffer } from 'buffer';
import PayloadType from 'src/@types/payload';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    bufferize(data: any): Buffer;
    login(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | {
        token: string;
    }>;
    newUser(payload: any): Promise<import(".prisma/client").User | {
        error: boolean;
        message: string;
        code: number;
    }>;
    listUsers(payload: PayloadType): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | (import(".prisma/client").User & {
        role: import(".prisma/client").Roles[];
        sales: import(".prisma/client").Sales[];
    })[]>;
}
