import { Component, OnInit } from '@angular/core';
import { Book } from '../../core/models/book.model';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {
  public book: Book;

  constructor() { }

  ngOnInit() {
  }

}
