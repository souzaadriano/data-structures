import { Environment } from 'environment-variables-decorator';
import { Singleton } from '@/shared/singleton.decorator';

@Singleton
export class DatabaseConfig {
  @Environment('DB_HOST')
  host: string;

  @Environment('DB_PASSWORD')
  password: string;

  @Environment('DB_PORT')
  port: number;

  @Environment('DB_USER')
  user: string;

  @Environment('DB_NAME')
  name: string;
}
