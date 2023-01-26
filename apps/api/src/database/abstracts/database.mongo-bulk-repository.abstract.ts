import { Model, PopulateOptions, Types } from 'mongoose';
import { IDatabaseBulkRepositoryAbstract } from '../interface/database.bulk.repository.interface';
import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
  IDatabaseRestoreManyOptions,
  IDatabaseSoftDeleteManyOptions,
} from '../interface/database.interface';

export abstract class DatabaseMongoBulkRepositoryAbstract<T>
  implements IDatabaseBulkRepositoryAbstract
{
  protected _repository: Model<T>;
  protected _populateOnFind?: PopulateOptions | PopulateOptions[];

  constructor(
    repository: Model<T>,
    populateOnFind?: PopulateOptions | PopulateOptions[]
  ) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async createMany<N>(
    data: N[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean> {
    const create = this._repository.insertMany(data, {
      session: options ? options.session : undefined,
    });

    await create;
    return true;
  }

  async deleteManyById(
    _id: string[],
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    const map: Types.ObjectId[] = _id.map((val) => new Types.ObjectId(val));

    const del = this._repository.deleteMany({
      _id: {
        $in: map,
      },
    });

    if (options && options.withDeleted) {
      del.where('deletedAt').exists(true);
    } else {
      del.where('deletedAt').exists(false);
    }

    if (options && options.session) {
      del.session(options.session);
    }

    if (options && options.populate) {
      del.populate(this._populateOnFind);
    }

    await del;
    return true;
  }

  async deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    const del = this._repository.deleteMany(find);

    if (options && options.withDeleted) {
      del.where('deletedAt').exists(true);
    } else {
      del.where('deletedAt').exists(false);
    }

    if (options && options.session) {
      del.session(options.session);
    }

    if (options && options.populate) {
      del.populate(this._populateOnFind);
    }

    await del;
    return true;
  }

  async softDeleteManyById(
    _id: string[],
    options?: IDatabaseSoftDeleteManyOptions
  ): Promise<boolean> {
    const map: Types.ObjectId[] = _id.map((val) => new Types.ObjectId(val));

    const softDel = this._repository
      .updateMany(
        {
          _id: {
            $in: map,
          },
        },
        {
          $set: {
            deletedAt: new Date(),
          },
        }
      )
      .where('deletedAt')
      .exists(false);

    if (options && options.session) {
      softDel.session(options.session);
    }

    if (options && options.populate) {
      softDel.populate(this._populateOnFind);
    }

    await softDel;
    return true;
  }

  async softDeleteMany(
    find: Record<string, any>,
    options?: IDatabaseSoftDeleteManyOptions
  ): Promise<boolean> {
    const softDel = this._repository
      .updateMany(find, {
        $set: {
          deletedAt: new Date(),
        },
      })
      .where('deletedAt')
      .exists(false);

    if (options && options.session) {
      softDel.session(options.session);
    }

    if (options && options.populate) {
      softDel.populate(this._populateOnFind);
    }

    await softDel;
    return true;
  }

  async restore(
    _id: string[],
    options?: IDatabaseRestoreManyOptions
  ): Promise<boolean> {
    const map: Types.ObjectId[] = _id.map((val) => new Types.ObjectId(val));

    const rest = this._repository
      .updateMany(
        {
          _id: {
            $in: map,
          },
        },
        {
          $set: {
            deletedAt: undefined,
          },
        }
      )
      .where('deletedAt')
      .exists(true);

    if (options && options.session) {
      rest.session(options.session);
    }

    if (options && options.populate) {
      rest.populate(this._populateOnFind);
    }

    await rest;
    return true;
  }

  async updateMany<N>(
    find: Record<string, any>,
    data: N,
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    const update = this._repository.updateMany(find, {
      $set: data,
    });

    if (options && options.withDeleted) {
      update.where('deletedAt').exists(true);
    } else {
      update.where('deletedAt').exists(false);
    }

    if (options && options.session) {
      update.session(options.session);
    }

    if (options && options.populate) {
      update.populate(this._populateOnFind);
    }

    await update;
    return true;
  }

  async bulkWrite<N>(
    bulkOps: any[],
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    const bulkWrite = this._repository.bulkWrite(bulkOps, {
      session: options ? options.session : undefined,
    });

    await bulkWrite;
    return true;
  }
}
