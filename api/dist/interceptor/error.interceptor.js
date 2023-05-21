"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const response_error_1 = require("../helpers/errors/response.error");
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            if (error instanceof response_error_1.CustomError) {
                throw new common_1.HttpException(`${error === null || error === void 0 ? void 0 : error.message}`, error === null || error === void 0 ? void 0 : error.code);
            }
            else if (error instanceof common_1.BadRequestException) {
                const validationErrors = error.getResponse();
                throw new common_1.HttpException(validationErrors, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Erro interno do gateway', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }));
    }
};
ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
exports.ErrorInterceptor = ErrorInterceptor;
//# sourceMappingURL=error.interceptor.js.map