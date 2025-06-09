module.exports = {
    apps : [
    {
      name: "encuestas",
      script: "dist/main.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        CORS_ORIGIN: 'localhost',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_NAME: 'Encuestas',
        DB_USER: 'postgres',
        DB_PASSWORD: '12345',
        DB_LOGGING: 'false',
        GLOBAL_PREFIX: 'api',
        SWAGGER_HABILITADO: false
      },
      time: true
    },
    ],
};