export declare class ResponseError extends Error {
    name: string;
    code: number;
    message: string;
    constructor(error: any);
}
export declare function CustomError(message: string, code: number): {
    error: boolean;
    message: string;
    code: number;
};
