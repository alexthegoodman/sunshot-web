import {repository} from '@loopback/repository';
import {get, param, post, requestBody, response} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {LicenseRepository, UserRepository} from '../repositories';
const formData = require('form-data');
// const Mailgun = require('mailgun.js');

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const postmark = require('postmark');
const pm = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

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
    @param.query.string('email') email: string,
  ): Promise<string> {
    // check if user exists in db
    const user = await this.userRepository.findOne({where: {email: email}});

    // let userLicense = null;

    // if (user) {
    //   userLicense = await this.licenseRepository.findOne({
    //     where: {userId: user?.id},
    //   });
    // }

    // console.info('user', user, userLicense);

    // // if user has license, return error
    // if (userLicense) {
    //   throw {
    //     statusCode: 400,
    //     message: 'User already has license',
    //   };
    // }

    let stripeCustomerId = user?.stripeCustomerId;

    // if not, create user
    if (!user) {
      const newUser = await this.userRepository.create({
        id: uuidv4(),
        email: email,
      });

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
      success_url: `${process.env.WEBAPP_DOMAIN}/thank-you.html`,
      cancel_url: `${process.env.WEBAPP_DOMAIN}/`,
      automatic_tax: {enabled: true},
      customer_update: {
        address: 'auto',
      },
    });

    return session.url;
  }

  /**
   * stripe webhook
   */
  @post('/webhook')
  @response(200, {
    description: 'Stripe webhook',
  })
  async webhook(@requestBody() body: any): Promise<string> {
    const {type, data} = body;

    console.info('webhook', type);

    // handle checkout.session.completed
    switch (type) {
      case 'checkout.session.completed':
        const session = data.object;
        const customer = await stripe.customers.retrieve(session.customer);
        const userId = customer.metadata.userId;

        // generate and associate license with user
        const licenseKey = uuidv4();

        // console.info(
        //   'checkout.session.completed',
        //   customer,
        //   userId,
        //   licenseKey,
        // );

        await this.licenseRepository.create({
          id: uuidv4(),
          key: licenseKey,
          userId: userId,
        });

        // console.info('license', license);

        console.info('license created');

        // get user by id
        const user = await this.userRepository.findById(userId);

        // // send email with license key
        // const mailgunData = {
        //   from: 'admin@sunshot.app',
        //   to: user.email,
        //   subject: `Here's Your License Key`,
        //   template: 'license',
        //   'h:X-Mailgun-Variables': JSON.stringify({
        //     // be sure to stringify your payload
        //     licenseKey,
        //   }),
        //   'h:Reply-To': 'reply-to@example.com',
        // };

        // // console.info('mailgun', mailgun, mg);

        // const response = await mg.messages.create('sunshot.app', mailgunData);

        // send email with tempalte via postmark
        const response = await pm.sendEmailWithTemplate({
          From: 'admin@sunshot.app',
          To: user.email,
          TemplateId: 33168023,
          TemplateModel: {
            licenses: [
              {
                key: licenseKey,
                grantDate: new Date().toLocaleDateString(),
                expirationDate: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 1),
                ).toLocaleDateString(),
              },
            ],
          },
        });

        console.info('email sent', response);

        break;
      default:
        break;
    }

    return 'ok';
  }
}
