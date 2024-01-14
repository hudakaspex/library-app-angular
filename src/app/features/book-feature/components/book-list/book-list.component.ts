import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { BookService } from "../../core/services/book.service";
import { Book } from "../../core/models/book.model";
import { BookType } from "../../core/models/book-type.enum";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule
  ]
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

  public searchCtrl = new FormControl();

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.initSearch();
  }

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

  private initSearch() {
    this.searchCtrl.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(500),
    )
    .subscribe(val => {
      this.searchEvent.emit(val);
    });
  }
}
