"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(error) {
        super(error.message);
        this.name = error.name;
        this.code = error.code;
        this.message = error.message;
    }
}
exports.ResponseError = ResponseError;
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=response.error.js.map