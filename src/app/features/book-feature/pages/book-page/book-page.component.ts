import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
  }

}
