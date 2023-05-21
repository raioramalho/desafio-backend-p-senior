declare class HashTools {
    generate(password_hash: string): Promise<string>;
    compare(password: string, password_hash: string): Promise<boolean>;
}
export declare const hashHelper: HashTools;
export {};
