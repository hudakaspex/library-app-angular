import { Component, inject, ViewContainerRef } from '@angular/core';
import { GeneralTableComponent } from 'app/shared/general-table/general-table.component';
import { LoanDialogComponent } from '../../components/loan-dialog/loan-dialog.component';
import { LoanService } from '../../core/services/loan.service';
import { PageService } from 'app/core/services/page.service';
import { TableColumn } from 'app/shared/general-table/models/table-column.model';
import { filter, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { Loan } from '../../core/models/loan.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'app/shared/utils';
import { PageEvent } from '@angular/material/paginator';
import { MemberService } from 'app/features/member-feature/core/services/member.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoanStatus } from '../../core/models/loan-status.enum';
import { ToastrService } from 'ngx-toastr';
import { LoanFilterDialogComponent } from '../../components/loan-filter-dialog/loan-filter-dialog.component';
import { LoanFilter } from '../../core/models/loan-filter.model';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralTableComponent,
    LoanDialogComponent,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    LoanService,
    PageService,
    MemberService
  ]
})
export class LoanPageComponent {
  private loanService = inject(LoanService);
  private toastr = inject(ToastrService);
  private viewContainerRef = inject(ViewContainerRef);
  private dialog = inject(MatDialog);
  public data$: Observable<{ total: number, data: Loan[] }>
  public columns: TableColumn[] = [
    { label: 'Member', propName: 'memberName', type: 'text' },
    { label: 'End Date', propName: 'endDate', type: 'date' },
    { label: 'Returned', propName: 'returnDate', type: 'date' },
    { label: 'Status', propName: 'status', type: 'text' },
  ];

  constructor() {
    this.initData();
  }

  private initData() {
    this.loanService.onFilter({status: LoanStatus.BORROWED} as LoanFilter)
    this.data$ = this.loanService.loan$()
      .pipe(
        shareReplay(1),
        this.mapResponse()
      );
  }

  private mapResponse() {
    return map((val: { total: number, data: Loan[] }) => {
      val.data = val.data.map(data => {
        data['memberName'] = data.member?.name;
        return data;
      });
      return val;
    })
  }

  public onAddEvent() {
    this.data$ = this.dialog.open(LoanDialogComponent, {
      width: "700px",
      disableClose: true,
      viewContainerRef: this.viewContainerRef
    })
      .afterClosed()
      .pipe(
        filter(loan => Utils.isNotEmpty(loan)),
        switchMap(loan => this.loanService.create(loan)),
        switchMap(() => {
          return this.loanService.loan$()
            .pipe(
              this.mapResponse()
            );
        }),
        shareReplay(1),
      )
  }

  public onUpdateEvent(loan: Loan) {
    this.data$ = this.dialog.open(LoanDialogComponent, {
      width: "700px",
      disableClose: true,
      data: loan,
      viewContainerRef: this.viewContainerRef

    })
      .afterClosed()
      .pipe(
        filter(loan => Utils.isNotEmpty(loan)),
        switchMap(loan => this.loanService.update(loan.id, loan)),
        switchMap(() => {
          return this.loanService.loan$()
            .pipe(
              this.mapResponse()
            );
        }),
        shareReplay(1),
      )
  }

  public onDeleteEvent(loan: Loan) {
    if (confirm(`Are you sure to delete this loan?`)) {
      this.data$ = this.loanService.delete(loan.id)
        .pipe(
          switchMap(() => {
            return this.loanService.loan$()
              .pipe(
                this.mapResponse()
              );
          }),
          shareReplay(1),
        );
    }
  }

  public onChangeStatus(loan: Loan) {
    if (confirm(`Are you sure to change status this loan to returned?`)) {
      this.data$ = this.loanService.updateStatus(loan.id, LoanStatus.RETURNED)
        .pipe(
          tap(() => {
            this.toastr.success("Loan status updated successfully", "Success");
          }),
          switchMap(() => {
            return this.loanService.loan$()
              .pipe(
                this.mapResponse()
              );
          }),
          shareReplay(1)
        );
    }
  }

  public onSearch(search: string) {
    this.loanService.onFilter({name: search} as LoanFilter);
  }

  public onPaginationEvent(event: PageEvent) {
    this.loanService.updatePagination(event.pageSize, event.pageIndex);
  }

  public onFilter() {
    this.dialog.open(LoanFilterDialogComponent, {
      width: '400px',
      data: this.loanService.currentFilter
    })
      .afterClosed()
      .pipe(
        filter(val => Utils.isNotEmpty(val)),
      )
      .subscribe((loanFilter: LoanFilter) => {
        let currentFilter = this.loanService.currentFilter as LoanFilter;
        if (Utils.isEmpty(loanFilter.status)) {
          delete currentFilter.status;
        }
        else {
          currentFilter = { ...currentFilter, ...loanFilter }
        }
        this.loanService.onFilter(currentFilter);
      });
  }
}
