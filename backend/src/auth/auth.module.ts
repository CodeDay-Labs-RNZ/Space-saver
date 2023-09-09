import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ClientSchema } from './schemas/client.schema';


/* The AuthModule class is responsible for handling authentication-related functionality in a
TypeScript application. Importing necessary modules, defining controllers and providers,
and exporting modules for use in other parts of the application. */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),

    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  /* passing modules to use in other modules for using protected routes */
  exports: [JwtStrategy, PassportModule],
})

export class AuthModule {}
