import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthorListComponent } from '../../components/author-list/author-list.component';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AuthorListComponent
  ]
})
export class AuthorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
