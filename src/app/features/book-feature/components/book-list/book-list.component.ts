import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Book } from "../../core/models/book.model";
import { BookType } from "../../core/models/book-type.enum";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { PaginationConfig } from "app/core/models/pagination-config";

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
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnChanges {
  @Input() books: Book[] = [];
  @Input() totalData: number;

  @Output("onAdd") addEvent = new EventEmitter();
  @Output("onDelete") deleteEvent = new EventEmitter();
  @Output("onUpdate") updateEvent = new EventEmitter();
  @Output("onSearch") searchEvent = new EventEmitter();
  @Output() paginationEvent = new EventEmitter();

  public displayedColumns = [
    "title",
    "author",
    "ISBN",
    "type",
    "publicationDate",
    "delete",
  ];

  public dataSource = new MatTableDataSource<Book>([]);

  public bookType = {
    [BookType.SELF_DEVELOPMENT]: "Self Development",
    [BookType.FICTION]: "Fiction",
  };

  public searchCtrl = new FormControl();

  public paginationConfig = PaginationConfig;

  constructor() {}

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

  public pageEvent(event: PageEvent) {
    this.paginationEvent.emit(event);
  }

  private initSearch() {
    this.searchCtrl.valueChanges
      .pipe(
        distinctUntilChanged(), 
        debounceTime(500),
        filter(val => val.length >= 3 || val.length == 0)
      )
      .subscribe((val) => {
        this.searchEvent.emit(val);
      });
  }
}
