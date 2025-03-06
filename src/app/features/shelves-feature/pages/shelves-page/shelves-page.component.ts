import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ShelvesService } from "../../core/services/shelves.service";
import { GeneralTableComponent } from "app/shared/general-table/general-table.component";
import { CommonModule } from "@angular/common";
import { PageService } from "app/core/services/page.service";
import { TableColumn } from "app/shared/general-table/models/table-column.model";
import { MatDialog } from "@angular/material/dialog";
import { Shelves } from "../../core/models/shelves.model";
import { filter, Observable, shareReplay, switchMap } from "rxjs";
import { ShelvesDialogComponent } from "../../components/shelves-dialog/shelves-dialog.component";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-shelves-page",
  standalone: true,
  imports: [CommonModule, GeneralTableComponent],
  providers: [ShelvesService, PageService],
  templateUrl: "./shelves-page.component.html",
  styleUrl: "./shelves-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShelvesPageComponent {
  private dialog = inject(MatDialog);
  private shelvesService = inject(ShelvesService);
  public data$: Observable<{ total: number; data: Shelves[] }>;

  public columns: TableColumn[] = [
    { label: "Label", propName: "label", type: "text" },
    { label: "Capacity", propName: "capacity", type: "number" },
  ];

  constructor() {
    this.initData();
  }

  private initData() {
    this.data$ = this.shelvesService.shelves$().pipe(shareReplay(1));
  }

  public onAddEvent() {
    this.dialog
      .open(ShelvesDialogComponent)
      .afterClosed()
      .pipe(
        filter((placement) => !!placement),
        switchMap((placement) => this.shelvesService.create(placement))
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onUpdateEvent(shelves: Shelves) {
    this.dialog
      .open(ShelvesDialogComponent, { data: shelves })
      .afterClosed()
      .pipe(
        filter((placement) => !!placement),
        switchMap((placement) =>
          this.shelvesService.update(placement.id, placement)
        )
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onDeleteEvent(shelves: Shelves) {
    if (confirm(`Are you sure to delete shelves ${shelves.label}?`)) {
      this.shelvesService.delete(shelves.id).subscribe(() => {
        this.initData();
      });
    }
  }

  public onSearchEvent(search: string) {
    this.shelvesService.searchShelves(search);
  }

  public onPaginationEvent(event: PageEvent) {
    this.shelvesService.updatePagination(event.pageSize, event.pageIndex);
  }
}
