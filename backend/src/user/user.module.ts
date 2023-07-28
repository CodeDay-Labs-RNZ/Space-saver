import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { ClientSchema } from '../auth/schemas/client.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  /* registering our model by importing userschema */
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Client', schema: ClientSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
