import {ID, field, objectType} from '@loopback/graphql';
import {Entity, model, property} from '@loopback/repository';

@objectType({description: 'The primary user model'})
@model()
export class User extends Entity {
  @field(type => ID)
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @field()
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @field()
  @property({
    type: 'date',
    required: true,
    onUpdate: 'now()',
  })
  dateUpdated: Date;

  @field()
  @property({
    type: 'date',
    required: true,
    default: () => new Date(),
  })
  dateCreated: Date;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
