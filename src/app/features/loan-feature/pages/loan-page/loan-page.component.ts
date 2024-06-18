import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { GeneralTableComponent } from 'app/shared/general-table/general-table.component';
import { LoanDialogComponent } from '../../components/loan-dialog/loan-dialog.component';
import { LoanService } from '../../core/services/loan.service';
import { PageService } from 'app/core/services/page.service';
import { TableColumn } from 'app/shared/general-table/models/table-column.model';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Loan } from '../../core/models/loan.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Utils } from 'app/shared/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { MemberService } from 'app/features/member-feature/core/services/member.service';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GeneralTableComponent,
    LoanDialogComponent
  ],
  providers: [
    LoanService,
    PageService,
    MemberService
  ]
})
export class LoanPageComponent implements OnInit {
  private loanService = inject(LoanService);
  private viewContainerRef = inject(ViewContainerRef);
  private dialog = inject(MatDialog);
  public data$: Observable<{ total: number, data: Loan[] }>
  public columns: TableColumn[] = [
    { label: 'Member', propName: 'memberName', type: 'text' },
    { label: 'Start Date', propName: 'startDate', type: 'date' },
    { label: 'End Date', propName: 'endDate', type: 'date' },
    { label: 'Returned', propName: 'returnedDate', type: 'date' },
    { label: 'Status', propName: 'loanStatus', type: 'text' },
  ];

  constructor() {
    this.initData();
  }

  ngOnInit() {
  }

  private initData() {
    this.data$ = this.loanService.loan$()
    .pipe(
      shareReplay(1), 
      takeUntilDestroyed(),
      map((val: {total: number, data: Loan[]}) => {
        val.data = val.data.map(data => {
          data['memberName'] = data.member?.name;
          return data;
        });
        return val;
      })
    );
  }

  public onAddEvent() {
    this.dialog.open(LoanDialogComponent, {
      width: "700px",
      disableClose: true,
      viewContainerRef: this.viewContainerRef
    })
      .afterClosed()
      .pipe(
        filter(loan => Utils.isNotEmpty(loan)),
        switchMap(loan => this.loanService.create(loan))
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onUpdateEvent(loan: Loan) {
    this.dialog.open(LoanDialogComponent, {
      width: "700px",
      disableClose: true,
      data: loan,
      viewContainerRef: this.viewContainerRef

    })
      .afterClosed()
      .pipe(
        filter(loan => Utils.isNotEmpty(loan)),
        switchMap(loan => this.loanService.update(loan.id, loan))
      )
      .subscribe(() => {
        this.initData();
      });
  }

  public onDeleteEvent(loan: Loan) {
    if (confirm(`Are you sure to delete this loan?`)) {
      this.loanService.delete(loan.id).subscribe(() => {
        this.loanService.onSearch();
      });
    }
  }

  public onSearch(search: string) {
    this.loanService.onSearch(search);
  }

  public onPaginationEvent(event: PageEvent) {
    this.loanService.updatePagination(event.pageSize, event.pageIndex);
  }
}
