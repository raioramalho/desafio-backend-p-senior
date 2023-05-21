/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { Request } from 'express';
export declare class CoursesController implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
    private client;
    bufferize(data: any): Buffer;
    listCourses(request: Request): Promise<any>;
    newCourse(data: any, request: Request): Promise<any>;
}
