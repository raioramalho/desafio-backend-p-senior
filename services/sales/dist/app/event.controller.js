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
const courses_1 = require("../@types/courses");
const user_1 = require("../@types/user");
let EventController = EventController_1 = class EventController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(EventController_1.name);
    }
    login(payload) {
        const user = new user_1.default(payload);
        this.logger.log(`[auth-new-user]: ${JSON.stringify(user)}`);
        return this.appService.singup(user);
    }
    newCourse(payload) {
        const course = new courses_1.CourseType(payload.body);
        this.logger.log(`[courses-new-course]: ${JSON.stringify(course)}`);
        return this.appService.newCourse(course);
    }
};
__decorate([
    (0, microservices_1.EventPattern)('auth-new-user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "login", null);
__decorate([
    (0, microservices_1.EventPattern)('courses-new-course'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "newCourse", null);
EventController = EventController_1 = __decorate([
    (0, common_1.Controller)('event'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map