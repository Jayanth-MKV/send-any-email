import { ApiProperty } from "@nestjs/swagger";

export class MailDto {

  @ApiProperty()
    to: string;
    
  @ApiProperty()
    subject: string;
    
  @ApiProperty()
    name: string;
    
  @ApiProperty()
  link: string;
}

export class MultiMailDto {

  @ApiProperty()
    to: string;
    
  @ApiProperty()
    subject: string;
    
  @ApiProperty()
    name: string;
    
  @ApiProperty()
  link: string;
}