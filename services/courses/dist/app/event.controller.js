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
var EventController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const user_1 = require("../@types/user");
const sales_1 = require("../@types/sales");
let EventController = EventController_1 = class EventController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(EventController_1.name);
    }
    newUser(payload) {
        this.logger.log(`[auth-new-user]: ${JSON.stringify(payload)}`);
        const user = new user_1.default(payload);
        return this.appService.singup(user);
    }
    newSale(payload) {
        const sale = new sales_1.SalesType(payload.body);
        this.logger.log(`[sales-new-sale]: ${JSON.stringify(sale)}`);
        return this.appService.newSale(sale);
    }
    cancelSale(payload) {
        const sale = new sales_1.SalesType(payload.body);
        this.logger.log(`[sales-cancel-sale]: ${JSON.stringify(sale)}`);
    }
};
__decorate([
    (0, microservices_1.EventPattern)('auth-new-user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "newUser", null);
__decorate([
    (0, microservices_1.EventPattern)('sales-new-sale'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "newSale", null);
__decorate([
    (0, microservices_1.EventPattern)('sales-cancel-sale'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "cancelSale", null);
EventController = EventController_1 = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map