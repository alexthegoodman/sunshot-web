import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {License} from '../models';
import {UserRepository} from '../repositories';

export class UserLicenseController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/license', {
    responses: {
      '200': {
        description: 'User has one License',
        content: {
          'application/json': {
            schema: getModelSchemaRef(License),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<License>,
  ): Promise<License> {
    return this.userRepository.license(id).get(filter);
  }
}
