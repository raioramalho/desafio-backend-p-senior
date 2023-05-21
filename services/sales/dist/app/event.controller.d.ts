import { AppService } from './app.service';
export declare class EventController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    login(payload: any): Promise<import(".prisma/client").User | {
        error: boolean;
        message: string;
        code: number;
    }>;
    newCourse(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses>;
}
