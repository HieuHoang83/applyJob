import { Injectable } from '@nestjs/common';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';

@Injectable()
export class RecruitmentPostService {
  create(createRecruitmentPostDto: CreateRecruitmentPostDto) {
    return 'This action adds a new recruitmentPost';
  }

  findAll() {
    return `This action returns all recruitmentPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitmentPost`;
  }

  update(id: number, updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
    return `This action updates a #${id} recruitmentPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitmentPost`;
  }
}
