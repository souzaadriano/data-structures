require('ts-node/register');
import path from 'path';
import dotenv from 'dotenv';
const dotenvFilePath = `${path.resolve(__dirname, '..', '..', '..')}/.env`;
dotenv.config({ path: dotenvFilePath });

const host = process.env['DB_HOST'];
const password = process.env['DB_PASSWORD'];
const port = process.env['DB_PORT'];
const user = process.env['DB_USER'];
const database = process.env['DB_NAME'];
const client = 'pg';
const pool = { min: 2, max: 10 };
const migrations = { directory: './migrations' };
const timezone = 'UTC';

console.log('Database Configuration', {
  client,
  host,
  password,
  port,
  user,
  database,
  pool,
  migrations,
  timezone,
});

module.exports = {
  client: 'pg',
  connection: { host, port, user, password, database },
  pool: { min: 2, max: 10 },
  migrations: { directory: './migrations' },
  timezone: 'UTC',
};
