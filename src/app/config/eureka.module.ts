import { NgModule, APP_INITIALIZER } from '@angular/core';

import { Eureka } from 'eureka-js-client';
import { EurekaConfigService } from './eureka.config';

export function eurekaInitializer(eurekaConfig: Eureka) {
  return () => eurekaConfig.start((error: any) => {
    console.log(error || 'Eureka registration complete');
  });
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: eurekaInitializer,
      deps: [EurekaConfigService],
      multi: true
    },
   
  ]
})
export class EurekaModule {}
