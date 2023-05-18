import {
  ResolverInterface,
  arg,
  fieldResolver,
  query,
  resolver,
  root,
} from '@loopback/graphql';
import {repository} from '@loopback/repository';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories';

@resolver(of => User)
export class UserResolver implements ResolverInterface<User> {
  constructor(
    // Inject an instance of RecipeRepository
    @repository('UserRepository')
    private readonly userRepo: UserRepository, // Inject an instance of RecipeService // @service(RecipeService) private readonly recipeService: RecipeService,
  ) {}

  // Map to a GraphQL query to get recipe by id
  @query(returns => User, {nullable: true})
  async user(@arg('userId') userId: string) {
    return this.userRepo.getOne(userId);
  }

  // // Map to a GraphQL query to list all recipes
  // @query(returns => [Recipe])
  // async recipes(): Promise<Recipe[]> {
  //   return this.recipeRepo.getAll();
  // }

  // // Map to a GraphQL mutation to add a new recipe
  // @mutation(returns => Recipe)
  // async addRecipe(@arg('recipe') recipe: RecipeInput): Promise<Recipe> {
  //   return this.recipeRepo.add(recipe);
  // }

  // // Map to a calculated GraphQL field - `numberInCollection`
  // @fieldResolver()
  // async numberInCollection(@root() recipe: Recipe): Promise<number> {
  //   const index = await this.recipeRepo.findIndex(recipe);
  //   return index + 1;
  // }

  // @fieldResolver()
  // async userCount(): Promise<number> {
  //   const total = await this.userRepo.count();
  //   return total.count;
  // }

  @query(returns => [User], {nullable: true})
  async users(): Promise<User[]> {
    return this.userRepo.find();
  }

  @fieldResolver()
  async email(@root() user: User): Promise<string> {
    return user.email;
  }
}
