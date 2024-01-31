import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AuthorDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
