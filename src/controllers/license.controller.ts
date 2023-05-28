import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {License} from '../models';
import {LicenseRepository} from '../repositories';

export class LicenseController {
  constructor(
    @repository(LicenseRepository)
    public licenseRepository: LicenseRepository,
  ) {}

  @get('/licenses/{key}')
  @response(200, {
    description: 'Get license by key',
    content: {
      'application/json': {
        schema: getModelSchemaRef(License, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('key') key: string): Promise<License> {
    const license = await this.licenseRepository.findOne({where: {key: key}});

    if (!license) {
      throw new Error('License not found');
    }

    return license;
  }
}
