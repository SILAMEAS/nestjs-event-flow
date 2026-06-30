import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  @MaxLength(255)
  title: string;

  @IsString({ message: 'title must be a string' })
  @IsOptional()
  description?: string;

  @IsDateString({}, { message: 'date must be a date string' })
  @IsNotEmpty({ message: 'date is required' })
  date: string;

  @IsString({ message: 'location must be a string' })
  @IsNotEmpty({ message: 'location is required' })
  @MaxLength(255)
  location: string;

  @IsInt({ message: 'capacity must be a number' })
  @Min(1, { message: 'capacity must bigger than 0' })
  capacity: number;

  @IsInt({ message: 'price must be a number' })
  @Min(1, { message: 'price must be a number' })
  @IsOptional()
  price?: number;
}
