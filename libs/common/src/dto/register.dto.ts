import { LoginDto } from '@app/common/dto/login.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto extends LoginDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters characters' })
  name!: string;
}
