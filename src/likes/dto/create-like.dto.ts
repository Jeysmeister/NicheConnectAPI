import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  postId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsBoolean()
  like: boolean;
}
