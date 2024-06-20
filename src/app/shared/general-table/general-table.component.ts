import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { TableColumn } from "./models/table-column.model";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { PaginationConfig } from "app/core/models/pagination-config";
import { Utils } from "../utils";

@Component({
  selector: "app-general-table",
  templateUrl: "./general-table.component.html",
  styleUrls: ["./general-table.component.scss"],
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
})
export class GeneralTableComponent implements OnInit, OnChanges {
  @Input() hasPaginator = true;
  @Input() hasCreateBtn = true;
  @Input() hasDeleteBtn = true;
  @Input() hasUpdateBtn = true;
  @Input() hasSearchInput = true;
  @Input() columns: TableColumn[] = [];
  @Input() totalData: number;
  @Input({ required: true }) data: any[];
  @Input() dateFormat = 'dd MMM yyyy';
  @Input() searchPlaceholder = "Search ..."; 

  @Output("onAdd") onAddEvent = new EventEmitter<void>();
  @Output("onUpdate") onUpdateEvent = new EventEmitter<any>();
  @Output("onDelete") onDeleteEvent = new EventEmitter<any>();
  @Output("onPagination") onPaginationEvent = new EventEmitter<PageEvent>();
  @Output("onSearch") searchEvent = new EventEmitter<string>();

  public paginationConfig = PaginationConfig;
  public searchCtrl = new FormControl();
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[];

  ngOnInit() {
    if (this.hasSearchInput) {
      this.initSearch();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.initDisplayedColumns();
    }

    if (changes.data) {
      this.initDatasource();
    }
  }

  private initDisplayedColumns() {
    this.displayedColumns = this.columns.map((column) => column.propName);
    if (this.hasUpdateBtn || this.hasDeleteBtn) {
      this.displayedColumns = [...this.displayedColumns, "action"];
    }
  }

  private initDatasource() {
    this.dataSource.data = this.data;
  }

  public onAdd() {
    this.onAddEvent.emit();
  }

  public onDelete(data: any) {
    this.onDeleteEvent.emit(data);
  }
  
  public onUpdate(data: any) {
    this.onUpdateEvent.emit(data);
  }

  public pageEvent(event: PageEvent) {
    this.onPaginationEvent.emit(event);
  }

  private initSearch() {
    this.searchCtrl.valueChanges
      .pipe(Utils.searchPipe())
      .subscribe((val) => {
        this.searchEvent.emit(val);
      });
  }
}
