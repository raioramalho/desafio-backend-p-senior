declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    private static extractJWT;
    validate(payload: {
        id: number;
        uuid: string;
        email: string;
        role: [];
    }): Promise<{
        id: number;
        uuid: string;
        email: string;
        role: [];
    }>;
}
export {};
