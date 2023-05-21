import { PrismaService } from './prisma.service';
import UserType from 'src/@types/user';
import { SalesType } from 'src/@types/sales';
import { CourseType } from 'src/@types/courses';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    newSale(sale: SalesType): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales>;
    singup(user: UserType): Promise<import(".prisma/client").User | {
        error: boolean;
        message: string;
        code: number;
    }>;
    newCourse(course: CourseType): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses>;
    listSales(): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales[]>;
}
