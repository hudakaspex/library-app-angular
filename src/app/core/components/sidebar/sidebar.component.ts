import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/book', title: 'Book',  icon: 'book', class: '' },
    { path: '/placement', title: 'Placement',  icon: 'flag_2', class: '' },
    { path: '/author', title: 'Author',  icon: 'person', class: '' },
    { path: '/member', title: 'Member',  icon: 'card_membership', class: '' },
    { path: '/loan', title: 'Loan',  icon: 'event_note', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
