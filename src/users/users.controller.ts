import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserDatas } from 'src/shared/interface/user.interface';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getPosts(@Res() res) {
      const posts = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json(posts);
  }

  @Post()
    async addPost(@Res() res, @Body() createDto: CreateUserDto) {
        const newPost = await this.usersService.create({ data: { ...createDto }});
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }


}
