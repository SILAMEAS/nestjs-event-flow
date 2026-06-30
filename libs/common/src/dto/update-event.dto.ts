import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from '@app/common/dto/create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}
