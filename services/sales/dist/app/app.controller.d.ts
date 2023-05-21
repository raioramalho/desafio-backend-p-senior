import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    newSale(payload: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales>;
    cancelSale(payload: any): any;
    listSales(): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales[]>;
}
