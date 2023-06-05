import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
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

  @property({
    type: 'string',
  })
  userId?: string;
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<License>) {
    super(data);
  }
}

export interface LicenseRelations {
  // describe navigational properties here
}

export type LicenseWithRelations = License & LicenseRelations;
