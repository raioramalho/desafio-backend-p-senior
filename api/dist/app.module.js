"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app/app.controller");
const app_service_1 = require("./app/app.service");
const auth_controller_1 = require("./routes/auth/auth.controller");
const sale_controller_1 = require("./routes/sales/sale.controller");
const courses_controller_1 = require("./routes/courses/courses.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./token/jwt.strategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), jwt_1.JwtModule, passport_1.PassportModule],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            sale_controller_1.default,
            courses_controller_1.CoursesController,
        ],
        providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map