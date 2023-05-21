export declare class ResponseError extends Error {
    name: string;
    code: number;
    message: string;
    constructor(error: any);
}
export declare class CustomError extends Error {
    code: number;
    constructor(message: string, code: number);
}
