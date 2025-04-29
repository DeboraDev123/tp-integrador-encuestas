export default () => ({
    port: process.env.PORT,
    prefix: process.env.GLOBAL_PREFIX,
    swaggerHabilitado: process.env.SWAGGER_HABILITADO === 'true',
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      logging: process.env.DB_LOGGING === 'true',
      logger: process.env.DB_LOGGER,
    },
  });
  