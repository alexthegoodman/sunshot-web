import {inject} from '@loopback/core';
import {Count, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(User, dataSource);
  }

  async getOne(id: string): Promise<User | null> {
    return this.findOne({where: {id}});
  }

  async count(): Promise<Count> {
    return this.count();
  }
}
