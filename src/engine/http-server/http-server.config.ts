import { Singleton } from '@/shared/singleton.decorator';
import { Environment } from 'environment-variables-decorator';

@Singleton
export class HttpServerConfig {
  @Environment('HTTP_SERVER_PORT')
  port: string;
}
