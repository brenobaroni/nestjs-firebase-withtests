
import { LeadController } from "./lead.controller"
import { Test, TestingModule } from "@nestjs/testing";
import { REQUEST } from "@nestjs/core";
import { LeadsService } from "../../service/leads.service";
import { PrismaService } from "../../infra/prisma/prisma.service";
import { FirebaseAdmin, FirebaseModule } from "nestjs-firebase";
import { CqrsModule } from "@nestjs/cqrs";
import { Lead } from "entities/LeadEntity";
import { PrismaModule } from "../../infra/prisma/prisma.module";
import { LeadModule } from "./lead.module";
import { ConfigModule } from "@nestjs/config";


describe('LeadController', () => {
    let leadController: LeadController;
    let leadService: LeadsService;
    let prismaService: PrismaService;
    let firebase: FirebaseAdmin;


    beforeAll(async () => {
        var module = await Test.createTestingModule({
            controllers: [LeadController],
            providers: [
            ],
            imports: [
                CqrsModule,
                PrismaModule,
                LeadModule,
                ConfigModule.forRoot({ cache: true }),
                FirebaseModule.forRoot({
                    googleApplicationCredential: "firebasekey.json",
                    projectId: "servfy-6acda"
                })
            ]
        }).compile();
        firebaseAdmin: module.get<FirebaseAdmin>(FirebaseModule)
        leadController: module.get<LeadController>(LeadsService);
        leadService: module.get<LeadsService>(LeadsService);

        describe('findById', () => {
            it('should return a lead', async () => {
                const result = {} as Lead | any;
                jest.spyOn(leadService, 'getLeadFbByEmailAsync').mockImplementation(() => result);

                expect(await leadService.getLeadFbByEmailAsync).toBe(result);
            });
        });
    });



})