import { PrismaService } from './prisma.service';
import UserType from 'src/@types/user';
import { CourseType } from 'src/@types/courses';
import { SalesType } from 'src/@types/sales';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listCourses(jwt: string): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Courses[]>;
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
    newSale(sale: SalesType): Promise<{
        error: boolean;
        message: string;
        code: number;
    } | import(".prisma/client").Sales>;
}
