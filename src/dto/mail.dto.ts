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
  @ApiProperty({ example: 'happie123happy@gmail.com' })
  to: string;

  @ApiProperty({ example: 'Invitation to Event 1' })
  subject: string;

  @ApiProperty({ example: 'Happy' })
  name: string;

  @ApiProperty({ example: 'https://example.com/invitation1' })
  link: string;
}