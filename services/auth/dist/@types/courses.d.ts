import { Courses } from '@prisma/client';
export declare class CourseType implements Courses {
    id: number;
    uuid: string;
    title: string;
    price: number;
    created_at: Date;
    updated_at: Date;
    constructor(course: Courses);
    getUUID(): string;
    getID(): number;
}
