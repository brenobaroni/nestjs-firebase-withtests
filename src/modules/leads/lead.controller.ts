import { Body, Controller, Get, Param, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateLeadCommand, GetLeadByEmailQuery } from './lead.commands';
import { LeadsService } from '../../service/leads.service';

@Controller('leads')
export class LeadController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly leadService: LeadsService
      ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAsync(@Body() data: CreateLeadCommand) {
    const res =  await this.commandBus.execute(data);
    return res;
  }

  @Get('email')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getLeadByEmailAsync(@Query() query: GetLeadByEmailQuery) {
    const res = await this.leadService.getLeadFbByEmailAsync(query.email);
    return res;
  }

  @Post('email')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLeadByEmailAsync(@Body() query: CreateLeadCommand) {
    const res = await this.leadService.createLeadFbAsync(query);
    return res;
  }
}
