module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'rpf5573',
  password: process.env.DB_PASSWORD || 'thoumas138',
  database: process.env.DB_DATABASE || 'discovery',
  entities: [
    'dist/**/puzzle.entity.js',
    'dist/**/team-password.entity.js',
    'dist/**/team-point.entity.js',
    'dist/**/timer.entity.js',
    'dist/**/options.entity.js',
  ],
  synchronize: false,
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: { migrationsDir: 'dist/migration' },
};
