module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'rpf5573',
  password: process.env.DB_PASSWORD || 'thoumas138',
  database: process.env.DB_DATABASE || 'discovery',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/migration/**/*.js'],
  cli: { migrationsDir: 'dist/src/migration' },
};
