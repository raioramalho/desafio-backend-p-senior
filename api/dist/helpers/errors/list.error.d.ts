interface IError {
    name: string;
    code: number;
    message: string;
}
declare class ErrorList {
    Internal_Server_Error: IError;
    Already_Exists: IError;
    Not_Found_Error: IError;
    Bad_Request_Error: IError;
    Expectation_Failed_Error: IError;
}
export declare const errorList: ErrorList;
export {};
