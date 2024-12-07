import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { Public } from 'src/decorators/customize';
import { ApiQuery } from '@nestjs/swagger';

@Controller('recruitment-post')
export class RecruitmentPostController {
  constructor(
    private readonly recruitmentPostService: RecruitmentPostService,
  ) {}

  @Public()
  @Post()
  create(@Body() createRecruitmentPostDto: CreateRecruitmentPostDto) {
    return this.recruitmentPostService.create(createRecruitmentPostDto);
  }

  @Public() // Đánh dấu endpoint này là công khai
  @Get() // Phương thức GET cho đường dẫn này
  async findAll(
    @Query('page') page: string = '1', // Tham số 'page', mặc định là '1'
    @Query('pageSize') pageSize: string = '10', // Tham số 'pageSize', mặc định là '5'
    @Query('still') still: string = '10', // Tham số 'pageSize', mặc định là '5'
  ) {
    const pageNumber = parseInt(page, 10); // Chuyển đổi sang số nguyên
    const size = parseInt(pageSize, 10); // Chuyển đổi sang số nguyên

    let result;
    if (still === 'still') {
      result = await this.recruitmentPostService.findPaginatedPostsStill(
        pageNumber,
        size,
      );
    } else {
      result = await this.recruitmentPostService.findPaginatedPosts(
        pageNumber,
        size,
      );
    }

    return {
      success: true,
      ...result, // Gộp kết quả từ findPaginatedPosts
    };
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentPostService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecruitmentPostDto: UpdateRecruitmentPostDto,
  ) {
    return this.recruitmentPostService.update(+id, updateRecruitmentPostDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentPostService.remove(+id);
  }

  @Public()
  @Get('trends/analyze')
  @ApiQuery({ name: 'industry', required: false, type: String })
  @ApiQuery({ name: 'minRating', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({
    name: 'levelType',
    required: false,
    enum: ['Competition', 'Attractiveness'],
  })
  analyzeRecruitmentTrends(
    @Query('industry') industry?: string,
    @Query('minRating') minRating?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('levelType') levelType?: 'Competition' | 'Attractiveness',
  ) {
    return this.recruitmentPostService.analyzeRecruitmentTrends(
      industry,
      minRating,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      levelType,
    );
    // Các cách sử dụng:
    // GET /recruitment-post/trends/analyze
    // GET /recruitment-post/trends/analyze?industry=Công nghệ thông tin
    // GET /recruitment-post/trends/analyze?minRating=3.5
    // GET /recruitment-post/trends/analyze?startDate=2022-01-01&endDate=2024-12-31
    // GET /recruitment-post/trends/analyze?levelType=Attractiveness
    // GET /recruitment-post/trends/analyze?industry=Công nghệ thông tin&minRating=3.5&startDate=2022-01-01&endDate=2024-12-31&levelType=Competition
  }

  @Public()
  @Get('stats/company')
  @ApiQuery({ name: 'minRating', required: false, type: Number })
  @ApiQuery({ name: 'minApplications', required: false, type: Number })
  @ApiQuery({ name: 'industry', required: false, type: String })
  getRecruitmentStatsByCompany(
    @Query('minRating') minRating?: number,
    @Query('minApplications') minApplications?: number,
    @Query('industry') industry?: string,
  ) {
    return this.recruitmentPostService.getRecruitmentStatsByCompany(
      minRating,
      minApplications,
      industry,
    );
    // Các cách sử dụng:
    // GET /recruitment-post/stats/company
    // GET /recruitment-post/stats/company?minRating=4.0
    // GET /recruitment-post/stats/company?minApplications=10
    // GET /recruitment-post/stats/company?industry=Technology
    // GET /recruitment-post/stats/company?minRating=4.0&minApplications=10&industry=Technology
  }

  @Public()
  @Get(':postId/filter-records')
  @ApiQuery({ name: 'certificateName', required: false })
  @ApiQuery({ name: 'schoolName', required: false })
  @ApiQuery({ name: 'companyName', required: false })
  filterRecordsByRequirements(
    @Param('postId') postId: number,
    @Query('certificateName') certificateName?: string,
    @Query('schoolName') schoolName?: string,
    @Query('companyName') companyName?: string,
  ) {
    return this.recruitmentPostService.filterRecordsByRequirements(
      postId,
      certificateName,
      schoolName,
      companyName,
    );
    // Các cách sử dụng:
    // GET /recruitment-post/1/filter-records
    // GET /recruitment-post/1/filter-records?certificateName=AWS
    // GET /recruitment-post/1/filter-records?schoolName=Bach Khoa
    // GET /recruitment-post/1/filter-records?companyName=FPT
    // GET /recruitment-post/1/filter-records?certificateName=AWS&schoolName=Bach Khoa&companyName=FPT
  }
}
