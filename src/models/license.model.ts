import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model({settings: {strict: true}})
export class License extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  // expiration date today + 1 year
  @property({
    type: 'date',
    required: true,
    default: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      return date;
    },
  })
  expirationDate: Date;

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

  @belongsTo(() => User)
  userId?: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<License>) {
    super(data);
  }
}

export interface LicenseRelations {
  // describe navigational properties here
  user?: UserWithRelations;
}

export type LicenseWithRelations = License & LicenseRelations;
