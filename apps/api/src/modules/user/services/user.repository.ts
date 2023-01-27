import { DatabaseMongoRepositoryAbstract } from '@api/database/abstracts/database.mongo-repository.abstract';
import { IDatabaseRepositoryAbstract } from '@api/common/interfaces/database.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository
  extends DatabaseMongoRepositoryAbstract<UserDocument>
  implements IDatabaseRepositoryAbstract<UserDocument>
{
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>
  ) {
    super(userModel);
  }
}
