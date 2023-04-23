import { Component } from '@angular/core';
import { PropertyRepositary } from '../model/property.repository';
import { Property } from '../model/property.model';
import { Admin } from '../model/admin.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'discription',
  templateUrl: 'discription.component.html',
  styleUrls: ['discription.component.css'],
})
export class DiscriptionComponent {

  constructor(private repositary: PropertyRepositary,private activeRoute: ActivatedRoute) {

  }

  get property1():Property {
     return this.repositary.getProperty(this.activeRoute.snapshot.params['id']);
  }

  deleteProperty(id: any) {
    console.log(id + ' in component');
    if (
      confirm(
        'By pressing ok you will delete the data permanently from database'
      )
    ) {
      this.repositary.deleteProperty(id);
    }
  }

}
