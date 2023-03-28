module.exports = {
  host: 'localhost',
  port: process.env.PORT || 3030,
  origins: [
    'http://localhost:3030',
    'http://localhost:3000',
    'web-production-3b91.up.railway.app'
  ],
  paginate: {
    default: 10,
    max: 50
  },
  postgresql: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'supporty'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  authentication: {
    entity: 'user',
    service: 'users',
    secret: 'VL59H5Mz4td/nR/oxTumJrwCKOgeltEZ',
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      header: {
        typ: 'access'
      },
      audience: 'https://yourdomain.com',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'email',
      passwordField: 'password'
    }
  }
}
