import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    newCourse(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses>;
    list(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses[]>;
}
