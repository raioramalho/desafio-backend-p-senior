"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SalesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const crypto_1 = require("crypto");
const response_error_1 = require("../../helpers/errors/response.error");
const jwt_guard_1 = require("../../token/jwt.guard");
let SalesController = SalesController_1 = class SalesController {
    constructor() {
        this.logger = new common_1.Logger(SalesController_1.name);
    }
    async onModuleInit() {
        const requestPatters = [
            'sales-new-sale',
            'sales-list-sales',
            'sales-cancel-sale',
        ];
        requestPatters.forEach((pattern) => {
            this.client.subscribeToResponseOf(pattern);
            this.client.connect;
        });
    }
    bufferize(data) {
        return Buffer.from(JSON.stringify(data));
    }
    async newSale(data, request) {
        data['uuid'] = (0, crypto_1.randomUUID)();
        const payload = {
            body: data,
            tokenr: request.headers.authorization.split(' ')[1],
        };
        const result = await this.client
            .send('sales-new-sale', this.bufferize(payload))
            .toPromise();
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw new response_error_1.CustomError(result === null || result === void 0 ? void 0 : result.message, result === null || result === void 0 ? void 0 : result.code);
        }
        return result;
    }
    async listSales(request) {
        const payload = {
            body: null,
            token: request.headers.authorization.split(' ')[1],
        };
        const result = await this.client
            .send('sales-list-sales', payload)
            .toPromise();
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw new response_error_1.CustomError(result === null || result === void 0 ? void 0 : result.message, result === null || result === void 0 ? void 0 : result.code);
        }
        return result;
    }
    async cancelSale(body, request) {
        const payload = {
            body,
            token: request.headers.authorization.split(' ')[1],
        };
        const result = await this.client
            .send('sales-cancel-sale', payload)
            .toPromise();
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw new response_error_1.CustomError(result === null || result === void 0 ? void 0 : result.message, result === null || result === void 0 ? void 0 : result.code);
        }
        return result;
    }
};
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: 'sale-api',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'sales-consumer',
                allowAutoTopicCreation: true,
            },
            producer: {
                transactionalId: 'sales-producer',
                allowAutoTopicCreation: true,
                idempotent: false,
            },
        },
    }),
    __metadata("design:type", microservices_1.ClientKafka)
], SalesController.prototype, "client", void 0);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "newSale", null);
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "listSales", null);
__decorate([
    (0, common_1.Delete)('/cancel'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "cancelSale", null);
SalesController = SalesController_1 = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('sales')
], SalesController);
exports.default = SalesController;
//# sourceMappingURL=sale.controller.js.map