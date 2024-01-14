import { Component, OnInit } from "@angular/core";
import { BookService } from "../../core/services/book.service";
import { Observable, filter, switchMap } from "rxjs";
import { Book } from "../../core/models/book.model";
import { BookDialogComponent } from "../../components/book-dialog/book-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { BookListComponent } from "../../components/book-list/book-list.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookListComponent,
  ]
})
export class BookPageComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
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
        this.onSearch();
      });
  }

  public onDelete(book: Book) {
    if (confirm(`Are you sure to delete book ${book.title}?`)) {
      this.bookService.deleteBook(book.id).subscribe(() => {
        this.onSearch();
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
        this.onSearch();
      });
  }

  public onSearch(value = "") {
    if (value.length >= 3 || value.length == 0) {
      this.books$ = this.bookService.searchByTitle(value);
    }
  }
}
