import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AuthorListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
