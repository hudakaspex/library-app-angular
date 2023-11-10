import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { BookService } from "../../core/services/book.service";
import { Book } from "../../core/models/book.model";
import { MatTableDataSource} from "@angular/material/table";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit, OnChanges {
  @Input() books: Book[] = [];

  @Output("onAdd") addEvent = new EventEmitter();

  public displayedColumns = ["title", "author", "ISBN", "type", "publicationDate"];

  public dataSource = new MatTableDataSource<Book>([]);

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.books && changes.books.currentValue) {
      this.dataSource.data = this.books;
    }
  }

  public onAdd() {
    this.addEvent.emit();
  }
}
