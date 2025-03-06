import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, ViewContainerRef } from "@angular/core";
import { GeneralTableComponent } from "app/shared/general-table/general-table.component";
import { TableColumn } from "app/shared/general-table/models/table-column.model";
import { filter, Observable, shareReplay, switchMap } from "rxjs";
import { Placement } from "../../core/models/placement.model";
import { PlacementService } from "../../core/services/placement.service";
import { PageEvent } from "@angular/material/paginator";
import { PageService } from "app/core/services/page.service";
import { MatDialog } from "@angular/material/dialog";
import { PlacementDialogComponent } from "../../components/placement-dialog/placement-dialog.component";
import { ShelvesService } from "app/features/shelves-feature/core/services/shelves.service";

@Component({
  selector: "app-placement-page",
  templateUrl: "./placement-page.component.html",
  styleUrls: ["./placement-page.component.scss"],
  standalone: true,
  imports: [CommonModule, GeneralTableComponent],
  providers: [PlacementService, PageService, ShelvesService],
})
export class PlacementPageComponent {
  private dialog = inject(MatDialog);
  private placementService = inject(PlacementService);
  public data$: Observable<{ total: number; data: Placement[] }>;

  public columns: TableColumn[] = [
    { label: "Shelf", propName: "shelf", type: "text" },
    { label: "Level", propName: "level", type: "number" },
    { label: "Section", propName: "section", type: "number" },
    { label: "Book", propName: "book", type: "text" },
  ];

  constructor(private viewContainerRef: ViewContainerRef) {
    this.initData();
  }

  private initData() {
    this.data$ = this.placementService.placements$().pipe(shareReplay(1));
  }

  public onAddEvent() {
    this.dialog
      .open(PlacementDialogComponent, {
        viewContainerRef: this.viewContainerRef,
      })
      .afterClosed()
      .pipe(
        filter((placement) => !!placement),
        switchMap((placement) => this.placementService.create(placement))
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onUpdateEvent(placement: Placement) {
    this.dialog
      .open(PlacementDialogComponent, {
        data: placement,
        viewContainerRef: this.viewContainerRef,
      })
      .afterClosed()
      .pipe(
        filter((placement) => !!placement),
        switchMap((placement) =>
          this.placementService.update(placement.id, placement)
        )
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onDeleteEvent(placement: Placement) {
    if (
      confirm(
        `Are you sure to delete placement ${placement.level}-${placement.section}?`
      )
    ) {
      this.placementService.delete(placement.id).subscribe(() => {
        this.initData();
      });
    }
  }

  public onPaginationEvent(event: PageEvent) {
    this.placementService.updatePagination(event.pageSize, event.pageIndex);
  }
}
