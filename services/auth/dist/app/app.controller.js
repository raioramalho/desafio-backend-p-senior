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
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const buffer_1 = require("buffer");
const user_1 = require("../@types/user");
const payload_1 = require("../@types/payload");
let AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    bufferize(data) {
        return buffer_1.Buffer.from(JSON.stringify(data));
    }
    login(payload) {
        const user = new user_1.default(payload);
        this.logger.log(`[auth-login]: ${JSON.stringify(user)}`);
        return this.appService.login(user);
    }
    newUser(payload) {
        const user = new user_1.default(payload);
        this.logger.log(`[auth-new-user]: ${JSON.stringify(user)}`);
        return this.appService.singup(user);
    }
    listUsers(payload) {
        this.logger.log(`[auth-list-users]`);
        return this.appService.list(payload.token);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('auth-login'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth-new-user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "newUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth-list-users'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payload_1.default]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "listUsers", null);
AppController = AppController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map