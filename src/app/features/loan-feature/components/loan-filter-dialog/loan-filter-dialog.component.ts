import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { GenericFormComponent } from 'app/shared/generic-form/generic-form.component';
import { FieldConfig } from 'app/shared/generic-form/models/field-config.model';
import { LoanStatus } from '../../core/models/loan-status.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanFilter } from '../../core/models/loan-filter.model';
import { Utils } from 'app/shared/utils';

@Component({
  selector: 'app-loan-filter-dialog',
  templateUrl: './loan-filter-dialog.component.html',
  styleUrls: ['./loan-filter-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    GenericFormComponent
  ]
})
export class LoanFilterDialogComponent implements OnInit {
  public formConfig: FieldConfig[] = [];
  public loanFilter:  WritableSignal<LoanFilter>;

  constructor(
    private dialogRef: MatDialogRef<LoanFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: LoanFilter,
  ) {
    const loanFilter = data ? data : new LoanFilter();
    this.loanFilter = signal(loanFilter);
  }

  ngOnInit() {
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: 'select',
        label: 'Status',
        value: this.loanFilter().status,
        options: [
          {
            label: 'Borrowed',
            value: LoanStatus.BORROWED
          },
          
          {
            label: 'Returned',
            value: LoanStatus.RETURNED
          },
          
          {
            label: 'Cancelled',
            value: LoanStatus.CANCELLED
          }
        ],
        name: 'status',
        cssClass: 'col-12',
        hasClear: true
      }
    ]
  }

  public onSave() {
    let loanFilter = this.loanFilter();
    if (Utils.isEmpty(loanFilter.status)) {
      delete loanFilter.status;
    }
    this.dialogRef.close(loanFilter);
  }

  public onCancel() {
    this.dialogRef.close();
  }

}
