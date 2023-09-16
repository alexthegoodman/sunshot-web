import {Filter, repository} from '@loopback/repository';
import {
  HttpErrors,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {License} from '../models';
import {UserRepository} from '../repositories';

const postmark = require('postmark');
const pm = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export class UserLicenseController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/licenses', {
    responses: {
      '200': {
        description: 'Get user licenses',
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
  ): Promise<License[]> {
    // return this.userRepository.license(id).get(filter);
    return this.userRepository.licenses(id).find(filter);
  }

  @post('/users/send-licenses/', {
    responses: {
      '200': {
        description: 'Send user licenses to user',
        content: {
          'application/json': {
            schema: getModelSchemaRef(License),
          },
        },
      },
    },
  })
  async post(
    // @param.path.string('id') id: string,
    @requestBody() body: {email: string},
    // @param.query.object('filter') filter?: Filter<License>,
  ): Promise<any> {
    const user = await this.userRepository.findByEmail(body.email);

    if (!user) {
      // throw new Error('User not found');
      return new HttpErrors.NotFound('User not found');
    }

    const licenses = await this.userRepository.licenses(user.id).find();

    console.info('send licenses', body, user, licenses);

    const response = await pm.sendEmailWithTemplate({
      From: 'admin@sunshot.app',
      To: user.email,
      TemplateId: 33168023,
      TemplateModel: {
        licenses: licenses.map(license => {
          return {
            key: license.key,
            grantDate: license.dateCreated.toLocaleDateString(),
            expirationDate: license.expirationDate.toLocaleDateString(),
          };
        }),
      },
    });

    console.info('sent', response);

    return {
      message: 'success',
    };
  }
}
