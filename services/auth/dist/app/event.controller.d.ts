import { AppService } from './app.service';
export declare class EventController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    newCourse(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses>;
    newSale(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales>;
    cancelSale(payload: any): void;
}
