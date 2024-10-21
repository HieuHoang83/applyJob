import { PartialType } from '@nestjs/swagger';
import { CreateRecruitmentPostDto } from './create-recruitment-post.dto';

export class UpdateRecruitmentPostDto extends PartialType(CreateRecruitmentPostDto) {}
