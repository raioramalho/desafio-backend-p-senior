import { AppService } from './app.service';
export declare class EventController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    newUser(payload: any): Promise<import(".prisma/client").User | {
        error: boolean;
        message: string;
        code: number;
    }>;
    newSale(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales>;
    cancelSale(payload: any): void;
}
