import { Component, OnInit } from '@angular/core';
import { AdminLoginRepository } from '../model/adminLogin.repositary';
import { Admin } from '../model/admin.model';

@Component({
  selector: 'admin-component',
  templateUrl: 'adminNav.component.html',
  styleUrls: ['adminNav.component.css'],
})
export class AdminNavComponent {
  constructor(private adminrepo: AdminLoginRepository) {}

  get admin(): Admin | undefined {
    return this.adminrepo.getAdmin();
  }
}
