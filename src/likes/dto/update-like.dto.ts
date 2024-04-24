import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { CreateLikeDto } from './create-like.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateLikeDto {
  @ApiProperty()
  @IsBoolean()
  like: boolean;
}
