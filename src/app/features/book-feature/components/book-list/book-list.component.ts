import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BookService } from "../../core/services/book.service";
import { Book } from "../../core/models/book.model";
import { MatTableDataSource} from "@angular/material/table";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit {
  @Input() books: Book[] = [];

  @Output("onAdd") addEvent = new EventEmitter();

  public displayedColumns = ["name", "penerbit", "date"];

  public dataSource = new MatTableDataSource<Book[]>([]);

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  public onAdd() {
    this.addEvent.emit();
  }
}
