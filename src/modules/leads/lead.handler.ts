import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { LeadsService } from "../../service/leads.service";
import { CreateLeadCommand, GetLeadByEmailQuery } from "./lead.commands";
import ResponseModel from "src/models/response.model";


@CommandHandler(CreateLeadCommand)
export class CreateLeadCommandHandler implements ICommandHandler<CreateLeadCommand> {
  constructor(private readonly leadService: LeadsService) {}

  async execute(command: CreateLeadCommand) {
    var currentyLead = await this.leadService.getLeadByEmail(command.email);

    if(!currentyLead){
      currentyLead = await this.leadService.createLead(command);
    }

    var responseModel = new ResponseModel(currentyLead, true, "");
    return responseModel;

  }
}

@QueryHandler(GetLeadByEmailQuery)
export class GetLeadByEmailQueryHandler implements IQueryHandler<GetLeadByEmailQuery> {
  constructor(private readonly leadService: LeadsService) {}

  async execute(command: GetLeadByEmailQuery) {

    var email = command.email;
    
    //var data = await this.leadService.getLeadByEmail(command.email);

    var dataFb = await this.leadService.getLeadFbByEmailAsync(email);

    var responseModel = new ResponseModel({}, true, "");

    return responseModel;
  }
}
