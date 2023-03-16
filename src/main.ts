import { Application } from './engine/application';
import { DatabaseConfig } from './engine/database/database.config';
import { DatabaseEngine } from './engine/database/database.engine';
import { HttpServerEngine } from './engine/http-server/http-server.engine';
import dotenv from 'dotenv';
dotenv.config();
const config = new DatabaseConfig();
console.log(config);
async function main() {
  await Application.use(new DatabaseEngine()).use(new HttpServerEngine()).start();
}

main().catch(console.error);
