import {repository} from '@loopback/repository';
import {get, param, post, response} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {LicenseRepository, UserRepository} from '../repositories';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export class StripeController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(LicenseRepository)
    public licenseRepository: LicenseRepository,
  ) {}

  /**
   * stripe session create
   */
  @get('/stripe/create-session')
  @response(200, {
    description: 'Create a session and user if needed',
    // content: {
    //   'application/json': {
    //     schema: {
    //       type: 'object',
    //       properties: {
    //         url: {type: 'string'},
    //       },
    //     },
    //   },
    // },
  })
  async createSession(
    @param.path.string('email') email: string,
  ): Promise<string> {
    // check if user exists in db
    const user = await this.userRepository.findOne({where: {email: email}});

    // if user has license, return error
    if (user?.license) {
      throw new Error('User already has a license');
    }

    let stripeCustomerId = user?.stripeCustomerId;

    // if not, create user
    if (!user) {
      const newUser = await this.userRepository.create({email: email});

      const customer = await stripe.customers.create({
        email: newUser.email,
        metadata: {
          userId: newUser.id,
        },
      });

      await this.userRepository.updateById(newUser.id, {
        stripeCustomerId: customer.id,
      });

      stripeCustomerId = newUser.stripeCustomerId;
    }

    // create stripe session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.WEBAPP_DOMAIN}/success.html`,
      cancel_url: `${process.env.WEBAPP_DOMAIN}/cancel.html`,
      automatic_tax: {enabled: true},
    });

    return session.url;
  }

  /**
   * stripe webhook
   */
  @post('/stripe/webhook')
  @response(200, {
    description: 'Stripe webhook',
  })
  async webhook(
    @param.query.string('id') id: string,
    @param.query.string('object') object: string,
    @param.query.string('type') type: string,
    @param.query.string('data') data: string,
  ): Promise<string> {
    console.log('id', id);
    console.log('object', object);
    console.log('type', type);
    console.log('data', data);

    // handle checkout.session.completed
    switch (type) {
      case 'checkout.session.completed':
        const session = JSON.parse(data).object;
        const customer = await stripe.customers.retrieve(session.customer);
        const userId = customer.metadata.userId;

        console.info('checkout.session.completed', customer, userId);

        // generate and associate license with user
        const licenseKey = uuidv4();
        await this.licenseRepository.create({
          key: licenseKey,
          userId: userId,
        });

        // send email with license key
        // TODO: mailgun?

        break;
      default:
        break;
    }

    return 'ok';
  }
}
