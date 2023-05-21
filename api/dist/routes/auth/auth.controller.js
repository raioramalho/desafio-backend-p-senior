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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const buffer_1 = require("buffer");
const crypto_1 = require("crypto");
const response_error_1 = require("../../helpers/errors/response.error");
const jwt_guard_1 = require("../../token/jwt.guard");
let AuthController = AuthController_1 = class AuthController {
    constructor() {
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async onModuleInit() {
        const requestPatters = ['auth-login', 'auth-new-user', 'auth-list-users'];
        requestPatters.forEach((pattern) => {
            this.client.subscribeToResponseOf(pattern);
            this.client.connect;
        });
    }
    bufferize(data) {
        return buffer_1.Buffer.from(JSON.stringify(data));
    }
    async login(data) {
        const result = await this.client
            .send('auth-login', this.bufferize(data))
            .toPromise();
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw new response_error_1.CustomError(result === null || result === void 0 ? void 0 : result.message, result === null || result === void 0 ? void 0 : result.code);
        }
        return result;
    }
    async newUser(data) {
        data['uuid'] = (0, crypto_1.randomUUID)();
        const result = await this.client
            .send('auth-new-user', this.bufferize(data))
            .toPromise();
        if (result === null || result === void 0 ? void 0 : result.error) {
            throw new response_error_1.CustomError(result === null || result === void 0 ? void 0 : result.message, result === null || result === void 0 ? void 0 : result.code);
        }
        return result;
    }
    async listUsers(request) {
        const payload = {
            body: null,
            token: request.headers.authorization.split(' ')[1],
        };
        const result = await this.client
            .send('auth-list-users', payload)
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
                clientId: 'auth-api',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'auth-consumer',
                allowAutoTopicCreation: true,
            },
            producer: {
                transactionalId: 'auth-producer',
                allowAutoTopicCreation: true,
                idempotent: false,
            },
        },
    }),
    __metadata("design:type", microservices_1.ClientKafka)
], AuthController.prototype, "client", void 0);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "newUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "listUsers", null);
AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map