import { Injectable } from '@angular/core';

@Injectable()
export class EurekaConfigService {
  // Implement methods to retrieve Eureka configuration properties
  // For example, you could retrieve them from environment variables or a configuration file
  public getEurekaServerHost(): string {
    return 'LOCALHOST';
  }

  public getEurekaServerPort(): number {
    return 8761;
  }
}
