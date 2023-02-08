export const environment = {
  production: true,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT, 10),
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  authServicePort: parseInt(process.env.AUTH_SERVICE_PORT, 10),
  usersServiceUrl: process.env.USERS_SERVICE_URL,
  usersServicePort: parseInt(process.env.USERS_SERVICE_PORT, 10),
  connectionsServiceUrl: process.env.CONNECTIONS_SERVICE_URL,
  connectionsServicePort: parseInt(process.env.CONNECTIONS_SERVICE_PORT, 10),
  connectionsServiceRedisHost: process.env.CONNECTIONS_SERVICE_REDIS_HOST,
  connectionsServiceRedisPort: parseInt(process.env.CONNECTIONS_SERVICE_REDIS_PORT, 10),
};
