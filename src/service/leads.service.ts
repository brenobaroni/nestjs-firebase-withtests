import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Lead } from "@prisma/client";
import { firestore } from "firebase-admin";
import { DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { PrismaService } from "../infra/prisma/prisma.service";
import { CreateLeadCommand, GetCombosQuery } from "src/modules/leads/lead.commands";
import {InjectFirebaseAdmin, FirebaseAdmin} from 'nestjs-firebase';
import { emit } from "process";


@Injectable()
export class LeadsService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  constructor(
    @Inject(REQUEST) private readonly request: { lead: any},
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private readonly prismaService: PrismaService,
  ) {
    this.collection = firestore().collection('leads');
  }

  async createLead(createLeadCommand: CreateLeadCommand) {
    try {
      var data = await this.prismaService.lead.create({
        data: {
          email: createLeadCommand.email.toLowerCase(),
          name: createLeadCommand.name,
        }
      })
    } catch (error) {
      throw error;
    }
    return data;
  }
  async getLeadByEmail(email: string) {
    console.log(email)
    var lead = await this.prismaService.lead.findUnique({
      where: {
        email: email.toLowerCase()
      }
    })

    return lead;
  }

  async createLeadFbAsync(createLeadCommand: CreateLeadCommand) {
    await this.firebase.firestore.collection(`lead`).add({
      id: createLeadCommand.email,
      name: createLeadCommand.name,
      email: createLeadCommand.email,
      increment_id: 0
    })
  }

  async getLeadFbByEmailAsync(email: string) {
    const data = (await this.firebase.firestore.doc(`lead/${email}`).get()).data();
    return data;
  }

  private transformTodo(querySnapshot: DocumentSnapshot<Lead>) {
    if (!querySnapshot.exists) {
      throw new Error(`no todo found with the given id`);
    }

    const lead = querySnapshot.data();
    const email = this.request.lead.email;

    if (lead.email !== email) {
      throw new Error(`no todo found with the given id`);
    }

    return {
      id: querySnapshot.id,
      ...lead,
    };
  }

}