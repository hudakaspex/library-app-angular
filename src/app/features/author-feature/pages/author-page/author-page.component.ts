import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AuthorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
