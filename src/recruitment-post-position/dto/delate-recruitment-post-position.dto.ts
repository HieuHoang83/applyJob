import { PartialType } from '@nestjs/swagger';
import { CreateRecruitmentPostPositionDto } from './create-recruitment-post-position.dto';

export class DeleteRecruitmentPostPositionDto extends PartialType(
  CreateRecruitmentPostPositionDto,
) {}
