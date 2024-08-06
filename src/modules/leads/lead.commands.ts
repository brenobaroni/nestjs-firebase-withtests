import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

//Commands

export class CreateLeadCommand {
  @IsEmail()
  public readonly email: string;
  @IsString()
  public readonly name: string;
  @IsNumber()
  public readonly increment_id: number;
}


//Query

export class GetLeadByEmailQuery {
  constructor(email){ this.email = email}

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;
}


export class GetCombosQuery {
  constructor() {}
}

