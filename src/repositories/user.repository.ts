import {Getter, inject} from '@loopback/core';
import {
  Count,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {License, User, UserRelations} from '../models';
import {LicenseRepository} from './license.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly licenses: HasManyRepositoryFactory<
    License,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('LicenseRepository')
    protected licenseRepositoryGetter: Getter<LicenseRepository>,
  ) {
    super(User, dataSource);
    // nonsense
    this.licenses = this.createHasManyRepositoryFactoryFor(
      'licenses',
      licenseRepositoryGetter,
    );
    this.registerInclusionResolver('licenses', this.licenses.inclusionResolver);
  }

  async getOne(id: string): Promise<User | null> {
    return this.findOne({where: {id}});
  }

  async count(): Promise<Count> {
    return this.count();
  }
}
