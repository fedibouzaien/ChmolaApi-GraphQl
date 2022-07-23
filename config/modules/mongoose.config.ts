import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export default (): MongooseModuleOptions => ({
  uri: process.env.DATABASE_DSN,
  // connectionName: 'chmola',
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  //  useNewUrlParser: true,
});