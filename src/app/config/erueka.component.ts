import { Component, OnInit } from '@angular/core';
import { Eureka } from 'eureka-js-client';

@Component({
  selector: 'app-eureka-registration',
  template: 'Eureka registration complete',
})
export class EurekaRegistrationComponent implements OnInit {
  constructor(private eurekaConfig: Eureka) {}

  ngOnInit(): void {
    this.eurekaConfig.start((error: any) => {
      console.log(error || 'Eureka registration complete');
    });
  }
}
