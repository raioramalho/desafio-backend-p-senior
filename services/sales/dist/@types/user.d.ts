import { User } from '@prisma/client';
export default class UserType implements User {
    id: number;
    uuid: string;
    email: string;
    password: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    constructor(user: User);
    getId(): number;
    getUUID(): string;
    checkPassword(cleanPassword: string): Promise<boolean>;
}
