import { Component, OnInit } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../core/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
  }

  public onAddBook() {
    this.dialog.open(BookDialogComponent, {
      width: "700px"
    })
  }

}
