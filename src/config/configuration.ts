import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASS,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      connection: process.env.DATABASE_CONNECTION,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
