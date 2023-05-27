import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {License, LicenseRelations} from '../models';

export class LicenseRepository extends DefaultCrudRepository<
  License,
  typeof License.prototype.id,
  LicenseRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(License, dataSource);
  }
}
