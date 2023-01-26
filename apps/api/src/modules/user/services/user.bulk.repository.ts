import { IDatabaseBulkRepositoryAbstract } from '@api/common/interfaces/database.bulk.repository.interface';
import { DatabaseMongoBulkRepositoryAbstract } from '@api/database/abstracts/database.mongo-bulk-repository.abstract';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserEntity } from '../schemas/user.schema';

@Injectable()
export class UserBulkRepository
  extends DatabaseMongoBulkRepositoryAbstract<UserDocument>
  implements IDatabaseBulkRepositoryAbstract
{
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>
  ) {
    super(userModel);
  }
}
