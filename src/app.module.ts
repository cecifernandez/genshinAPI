import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterSchema } from './schemas/character.schema';
import { CharacterService } from './service/character.service';
import { CharacterController } from './controller/character.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([{ name: 'Character', schema: CharacterSchema }]),
  ],
  controllers: [AppController, CharacterController],
  providers: [AppService, CharacterService],
})
export class AppModule {}
