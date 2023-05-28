import {repository} from '@loopback/repository';
import {get, param, response} from '@loopback/rest';
import {UserRepository} from '../repositories';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export class StripeController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
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
}
