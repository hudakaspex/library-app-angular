import { Component, OnInit } from "@angular/core";
import { BookService } from "../../core/services/book.service";
import { Observable, filter, map, switchMap } from "rxjs";
import { Book } from "../../core/models/book.model";
import { MatDialog } from "@angular/material/dialog";
import { BookDialogComponent } from "../../components/book-dialog/book-dialog.component";

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.scss"],
})
export class BookPageComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initBooks();
  }

  private initBooks() {
    this.books$ = this.bookService.getBooks();
  }

  public onAddBook() {
    this.dialog
      .open(BookDialogComponent, {
        width: "700px",
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((val) => val),
        switchMap((book) => this.bookService.addBook(book))
      )
      .subscribe((book) => {
        this.initBooks();
      });
  }

  public onDelete(book: Book) {
    if (confirm(`Are you sure to delete book ${book.title}?`)) {
      this.bookService.deleteBook(book.id).subscribe(() => {
        this.initBooks();
      });
    }
  }

  public onUpdate(book: Book) {
    this.dialog
      .open(BookDialogComponent, {
        width: "700px",
        disableClose: true,
        data: book,
      })
      .afterClosed()
      .pipe(
        filter((val) => val),
        switchMap((book) => this.bookService.updateBook(book))
      )
      .subscribe((book) => {
        this.initBooks();
      });
  }
}
