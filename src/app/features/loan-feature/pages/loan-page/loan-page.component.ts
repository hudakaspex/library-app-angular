import { Component, inject, ViewContainerRef } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';
import { MemberService } from 'app/features/member-feature/core/services/member.service';
import { CustomAction } from 'app/shared/general-table/models/custom-action.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoanStatus } from '../../core/models/loan-status.enum';
import { ToastrService } from 'ngx-toastr';

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
    { label: 'Returned', propName: 'returnedDate', type: 'date' },
    { label: 'Status', propName: 'status', type: 'text' },
  ];

  constructor() {
    this.initData();
  }

  private initData() {
    this.data$ = this.loanService.loan$()
    .pipe(
      shareReplay(1), 
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

  public onChangeStatus(loan: Loan) {
    if (confirm(`Are you sure to change status this loan to returned?`)) {
      this.loanService.updateStatus(loan.id, LoanStatus.RETURNED)
      .subscribe(() => {
        this.toastr.success("Loan status updated successfully", "Success");
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
