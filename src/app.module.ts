import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './infra/prisma/prisma.module';
import { LeadModule} from './modules/leads/lead.module'
import { ConfigModule } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    CqrsModule, 
    PrismaModule, 
    LeadModule, 
    ConfigModule.forRoot({ cache: true }),
    FirebaseModule.forRoot({
      googleApplicationCredential: "firebasekey.json",
      projectId: "servfy-6acda"
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService,
  ],
})
export class AppModule {}
