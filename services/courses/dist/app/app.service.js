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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const list_error_1 = require("../helpers/errors/list.error");
const response_error_1 = require("../helpers/errors/response.error");
const hash_tool_1 = require("../helpers/tools/hash.tool");
const crypto_1 = require("crypto");
const jwt_decode_1 = require("jwt-decode");
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listCourses(jwt) {
        const token = (0, jwt_decode_1.default)(jwt);
        try {
            const findCourses = await this.prisma.courses.findMany({
                where: {
                    title: {
                        in: token.role,
                    },
                },
            });
            if (findCourses.length === 0) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Not_Found_Error.message, list_error_1.errorList.Not_Found_Error.code);
            }
            return findCourses;
        }
        catch (error) {
            console.log(error);
            return (0, response_error_1.CustomError)(list_error_1.errorList.Internal_Server_Error.message, list_error_1.errorList.Internal_Server_Error.code);
        }
    }
    async singup(user) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            });
            if (findUser) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Already_Exists.message, list_error_1.errorList.Already_Exists.code);
            }
            user.password = await hash_tool_1.hashHelper.generate(user.password);
            const saveUser = await this.prisma.user.create({
                data: user,
            });
            if (!saveUser) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Expectation_Failed_Error.message, list_error_1.errorList.Expectation_Failed_Error.code);
            }
            return saveUser;
        }
        catch (error) {
            console.log(error);
            return (0, response_error_1.CustomError)(list_error_1.errorList.Internal_Server_Error.message, list_error_1.errorList.Internal_Server_Error.code);
        }
    }
    async newCourse(course) {
        try {
            const findCourse = await this.prisma.courses.findFirst({
                where: {
                    title: course.title,
                },
            });
            if (findCourse) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Already_Exists.message, list_error_1.errorList.Already_Exists.code);
            }
            const saveCourse = await this.prisma.courses.create({
                data: course,
            });
            if (!saveCourse) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Expectation_Failed_Error.message, list_error_1.errorList.Expectation_Failed_Error.code);
            }
            const newRole = await this.prisma.roles.create({
                data: {
                    uuid: (0, crypto_1.randomUUID)(),
                    title: saveCourse.title,
                },
            });
            if (!newRole) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Already_Exists.message, list_error_1.errorList.Already_Exists.code);
            }
            return saveCourse;
        }
        catch (error) {
            console.log(error);
            return (0, response_error_1.CustomError)(list_error_1.errorList.Internal_Server_Error.message, list_error_1.errorList.Internal_Server_Error.code);
        }
    }
    async newSale(sale) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: { email: sale.buyerEmail },
                include: {
                    role: {
                        select: {
                            title: true,
                        },
                    },
                },
            });
            if (!findUser) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Not_Found_Error.message, list_error_1.errorList.Not_Found_Error.code);
            }
            const findCourse = await this.prisma.courses.findUnique({
                where: {
                    uuid: sale.productId,
                },
            });
            if (!findCourse) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Not_Found_Error.message, list_error_1.errorList.Not_Found_Error.code);
            }
            const findSale = await this.prisma.sales.findUnique({
                where: {
                    service_key: sale.service_key,
                },
            });
            if (findSale) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Already_Exists.message, list_error_1.errorList.Already_Exists.code);
            }
            const checkPremium = findUser.role.filter((role) => role.title === 'PREMIUM_USER');
            if (!checkPremium[0]) {
                await this.prisma.roles.update({
                    where: {
                        title: 'PREMIUM_USER',
                    },
                    data: {
                        users: {
                            connect: {
                                email: findUser.email,
                            },
                        },
                    },
                });
            }
            const addRoletoUser = await this.prisma.roles.update({
                where: {
                    title: findCourse.title,
                },
                data: {
                    users: {
                        connect: {
                            email: findUser.email,
                        },
                    },
                },
            });
            if (!addRoletoUser) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Already_Exists.message, list_error_1.errorList.Already_Exists.code);
            }
            const saveSale = await this.prisma.sales.create({
                data: {
                    uuid: sale.uuid,
                    service_key: sale.service_key,
                    buyerEmail: findUser.email,
                    productId: findCourse.uuid,
                },
            });
            if (!saveSale) {
                return (0, response_error_1.CustomError)(list_error_1.errorList.Expectation_Failed_Error.message, list_error_1.errorList.Expectation_Failed_Error.code);
            }
            return saveSale;
        }
        catch (error) {
            console.log(error);
            return (0, response_error_1.CustomError)(list_error_1.errorList.Internal_Server_Error.message, list_error_1.errorList.Internal_Server_Error.code);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map