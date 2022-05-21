import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { connection, host, user, pass, name, port } =
          configService.database;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass,
          dbName: name,
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
