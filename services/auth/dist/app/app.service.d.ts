import UserType from 'src/@types/user';
import { PrismaService } from './prisma.service';
import { SalesType } from 'src/@types/sales';
import { CourseType } from 'src/@types/courses';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(jwt: string): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | (import(".prisma/client").User & {
        role: import(".prisma/client").Roles[];
        sales: import(".prisma/client").Sales[];
    })[]>;
    login(user: any): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | {
        token: string;
    }>;
    singup(user: UserType): Promise<import(".prisma/client").User | {
        error: boolean;
        message: string;
        code: number;
    }>;
    newSale(sale: SalesType): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales>;
    newCourse(course: CourseType): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses>;
}
