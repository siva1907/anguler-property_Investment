import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerSigninRepository } from 'src/app/model/customerSignIn.repository';

@Component({
  selector: 'home-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
})
export class NavComponent {
  //  public customer?: Customer ;
  isDropdownVisible = false;
  isScrolled = false;
  navbarHeight = 100; // Set the height of your navbar here
 
  constructor(private customerRepo: CustomerSigninRepository,private routeing:RouterLink ) {
  }


  get customer():Customer{
    return this.customerRepo.getLogedInCustomer();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) >= this.navbarHeight;
  }

  viewCustomer()
  {
    this.routeing.routerLink=`/orders/${this.customer.id}`;
  }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  removeCustomer(){
    this.customerRepo.logOutCustomer();
  }

}
