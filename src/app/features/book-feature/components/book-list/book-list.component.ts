import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { BookService } from "../../core/services/book.service";
import { Book } from "../../core/models/book.model";
import { MatLegacyTableDataSource as MatTableDataSource} from "@angular/material/legacy-table";
import { BookType } from "../../core/models/book-type.enum";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit, OnChanges {
  @Input() books: Book[] = [];

  @Output("onAdd") addEvent = new EventEmitter();
  @Output("onDelete") deleteEvent = new EventEmitter();
  @Output("onUpdate") updateEvent = new EventEmitter();
  @Output("onSearch") searchEvent = new EventEmitter();

  public displayedColumns = ["title", "author", "ISBN", "type", "publicationDate", "delete"];

  public dataSource = new MatTableDataSource<Book>([]);

  public bookType = {
    [BookType.SELF_DEVELOPMENT]: 'Self Development',
    [BookType.FICTION]: 'Fiction',
  };

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

  public onDelete(book: Book) {
    this.deleteEvent.emit(book);
  }

  public onUpdate(book: Book) {
    this.updateEvent.emit(book);
  }

  public onSearch(search) {
    console.log(search);
    this.searchEvent.emit(search);
  }
}
