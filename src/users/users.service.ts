import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateRequest, ListAll, UserDatas } from 'src/shared/interface/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private dataSource: DataSource,

  ) {}

    async findAll(query?: any): Promise<ListAll> {
        try {
          const [result] = await this.repo.findAndCount({
          });
          const resultData= result.map( item => {
            return  this.makeResponseData(item);
           });
          return { data: resultData };
        } catch (error) {
          throw error;
        }
      }


    async create(data: CreateRequest):Promise<UserDatas> {

        const userData = await this.saveData(data);
        return  this.makeResponseData(userData);
    }

    async saveData(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const responseData =  this.repo.create({
            name:data.data.name,
            email:data.data.email,
            password:await bcrypt.hash(data.data.password, 8),
          });
          await queryRunner.manager.save(responseData);
          await queryRunner.commitTransaction();
          return responseData;
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
        } finally {
          await queryRunner.release();
        }
      }

      async findByEmail(email: string) {
        return await this.repo.findOne({
          where: {
            email: email,
          },
        });
      }

  makeResponseData(userData){
    return {
      id:userData.id,
      name:userData.name,
      email:userData.email

    }
  }
}