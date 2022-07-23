import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';

export default (): Omit<GqlModuleOptions, 'driver'> => ({
  autoSchemaFile: true,
});