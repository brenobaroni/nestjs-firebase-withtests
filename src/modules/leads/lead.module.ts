import { Module } from "@nestjs/common";
import {LeadController} from "../../modules/leads/lead.controller";
import {PrismaModule} from "../../infra/prisma/prisma.module"
import { LeadsService } from "../../service/leads.service";
import { CreateLeadCommandHandler, GetLeadByEmailQueryHandler} from "../leads/lead.handler"
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    controllers: [
        LeadController
    ],
    imports: [
        PrismaModule,
        CqrsModule
    ],
    exports: [LeadsService],
    providers: [
        LeadsService,
        CreateLeadCommandHandler,
        GetLeadByEmailQueryHandler
    ],
  })
  export class LeadModule { }