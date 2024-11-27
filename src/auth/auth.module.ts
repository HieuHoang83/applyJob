import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { AdminsService } from 'src/admins/admins.service';
import { PrismaModule } from 'prisma/prisma.module';
import { EmployeesService } from 'src/employees/employees.service';
import { EmployersService } from 'src/employers/employers.service';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    CompanyModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminsService,
    EmployeesService,
    EmployersService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
