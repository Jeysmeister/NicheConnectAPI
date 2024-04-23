import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
