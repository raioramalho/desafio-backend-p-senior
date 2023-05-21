import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import UserType from 'src/@types/user';
import { errorList } from 'src/helpers/errors/list.error';
import { CustomError } from 'src/helpers/errors/response.error';
import { hashHelper } from 'src/helpers/tools/hash.tool';
import { SalesType } from 'src/@types/sales';
import { CourseType } from 'src/@types/courses';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async newSale(sale: SalesType) {
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
        return CustomError(
          errorList.Not_Found_Error.message,
          errorList.Not_Found_Error.code,
        );
      }

      const findCourse = await this.prisma.courses.findUnique({
        where: {
          uuid: sale.productId,
        },
      });

      if (!findCourse) {
        return CustomError(
          errorList.Not_Found_Error.message,
          errorList.Not_Found_Error.code,
        );
      }

      const findSale = await this.prisma.sales.findUnique({
        where: {
          service_key: sale.service_key,
        },
      });

      if (findSale) {
        return CustomError(
          errorList.Already_Exists.message,
          errorList.Already_Exists.code,
        );
      }

      const checkPremium = findUser.role.filter(
        (role) => role.title === 'PREMIUM_USER',
      );

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
        return CustomError(
          errorList.Already_Exists.message,
          errorList.Already_Exists.code,
        );
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
        return CustomError(
          errorList.Expectation_Failed_Error.message,
          errorList.Expectation_Failed_Error.code,
        );
      }

      return saveSale;
    } catch (error) {
      console.log(error);
      return CustomError(
        errorList.Internal_Server_Error.message,
        errorList.Internal_Server_Error.code,
      );
    }
  }

  async singup(user: UserType) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (findUser) {
        return CustomError(
          errorList.Already_Exists.message,
          errorList.Already_Exists.code,
        );
      }

      //criptografando a senha do usuário.
      user.password = await hashHelper.generate(user.password);

      const saveUser = await this.prisma.user.create({
        data: user,
      });

      if (!saveUser) {
        return CustomError(
          errorList.Expectation_Failed_Error.message,
          errorList.Expectation_Failed_Error.code,
        );
      }

      return saveUser;
      //
    } catch (error) {
      console.log(error);
      return CustomError(
        errorList.Internal_Server_Error.message,
        errorList.Internal_Server_Error.code,
      );
    }
  }

  async newCourse(course: CourseType) {
    try {
      const findCourse = await this.prisma.courses.findFirst({
        where: {
          title: course.title,
        },
      });

      if (findCourse) {
        return CustomError(
          errorList.Already_Exists.message,
          errorList.Already_Exists.code,
        );
      }

      const saveCourse = await this.prisma.courses.create({
        data: course,
      });

      if (!saveCourse) {
        return CustomError(
          errorList.Expectation_Failed_Error.message,
          errorList.Expectation_Failed_Error.code,
        );
      }
      const newRole = await this.prisma.roles.create({
        data: {
          uuid: randomUUID(),
          title: saveCourse.title,
        },
      });

      if (!newRole) {
        return CustomError(
          errorList.Already_Exists.message,
          errorList.Already_Exists.code,
        );
      }

      return saveCourse;
    } catch (error) {
      console.log(error);
      return CustomError(
        errorList.Internal_Server_Error.message,
        errorList.Internal_Server_Error.code,
      );
    }
  }

  async listSales() {
    try {
      const findSales = await this.prisma.sales.findMany();

      if (findSales.length === 0) {
        return CustomError(
          errorList.Not_Found_Error.message,
          errorList.Not_Found_Error.code,
        );
      }

      return findSales;
    } catch (error) {
      console.log(error);
      return CustomError(
        errorList.Internal_Server_Error.message,
        errorList.Internal_Server_Error.code,
      );
    }
  }
}
