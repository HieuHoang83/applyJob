import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecruitmentPostPositionService } from './recruitment-post-position.service';
import { CreateRecruitmentPostPositionDto } from './dto/create-recruitment-post-position.dto';
import { DeleteRecruitmentPostPositionDto } from './dto/delate-recruitment-post-position.dto';
import { SearchRecruitmentPostPositionDto } from './dto/search-recruitment-post-position.dto';

@Controller('recruitment-post-position')
export class RecruitmentPostPositionController {
  constructor(
    private readonly recruitmentPostPositionService: RecruitmentPostPositionService,
  ) {}

  @Post()
  create(
    @Body() createRecruitmentPostPositionDto: CreateRecruitmentPostPositionDto,
  ) {
    return this.recruitmentPostPositionService.create(
      createRecruitmentPostPositionDto,
    );
  }

  @Get('all')
  findAll() {
    return this.recruitmentPostPositionService.findAll();
  }
  @Get()
  findOption(
    @Body() searchRecruitmentPostPositionDto: SearchRecruitmentPostPositionDto,
  ) {
    let { recruitmentPostId, positionId } = searchRecruitmentPostPositionDto;

    if (recruitmentPostId && positionId) {
      return this.recruitmentPostPositionService.findByIds(
        recruitmentPostId,
        positionId,
      );
    } else if (recruitmentPostId) {
      return this.recruitmentPostPositionService.findPositionsByRecruitmentPost(
        recruitmentPostId,
      );
    } else if (positionId) {
      return this.recruitmentPostPositionService.findRecruitmentPostsByPosition(
        positionId,
      );
    } else {
      return null;
    }
  }

  @Delete()
  remove(
    @Body() deleteRecruitmentPostPositionDto: DeleteRecruitmentPostPositionDto,
  ) {
    let { recruitmentPostId, positionId } = deleteRecruitmentPostPositionDto;
    return this.recruitmentPostPositionService.remove(
      recruitmentPostId,
      positionId,
    );
  }
}
