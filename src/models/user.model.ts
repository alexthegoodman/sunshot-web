import {objectType} from '@loopback/graphql';
import {Entity, hasOne, model, property} from '@loopback/repository';
import {License} from './license.model';

@objectType({description: 'The primary user model'})
@model()
export class User extends Entity {
  // @field(type => ID)
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  // @field()
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    index: {
      unique: true,
    },
  })
  stripeCustomerId: string;

  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
    onUpdate: 'now()',
  })
  dateUpdated: Date;

  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
  })
  dateCreated: Date;

  @hasOne(() => License)
  license: License;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
