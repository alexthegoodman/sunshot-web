import {inject, Getter} from '@loopback/core';
import {Count, DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, License} from '../models';
import {LicenseRepository} from './license.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly license: HasOneRepositoryFactory<License, typeof User.prototype.id>;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('LicenseRepository') protected licenseRepositoryGetter: Getter<LicenseRepository>,) {
    super(User, dataSource);
    this.license = this.createHasOneRepositoryFactoryFor('license', licenseRepositoryGetter);
    this.registerInclusionResolver('license', this.license.inclusionResolver);
  }

  async getOne(id: string): Promise<User | null> {
    return this.findOne({where: {id}});
  }

  async count(): Promise<Count> {
    return this.count();
  }
}
