/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { Buffer } from 'buffer';
import { Request } from 'express';
export declare class AuthController implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
    private client;
    bufferize(data: any): Buffer;
    login(data: any): Promise<any>;
    newUser(data: any): Promise<any>;
    listUsers(request: Request): Promise<any>;
}
