import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { GenericFormComponent } from 'app/shared/generic-form/generic-form.component';
import { Loan } from '../../core/models/loan.model';
import { FieldConfig } from 'app/shared/generic-form/models/field-config.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../../core/services/loan.service';
import { map } from 'rxjs';
import { Member } from 'app/features/member-feature/core/models/member.model';

@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.scss'],
  standalone: true,
  imports: [
    DialogComponent,
    GenericFormComponent
  ]
})
export class LoanDialogComponent {
  private loanService = inject(LoanService);
  public loan: WritableSignal<Loan>;
  public formConfig: FieldConfig[] = [];
  public isFormValid = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Loan,
    private dialogRef: MatDialogRef<LoanDialogComponent>
  ) {
    const loan = this.data ? this.data : new Loan();
    this.loan = signal(loan);
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: 'date',
        label: 'Start Date',
        name: 'startDate',
        value: this.loan().getStartDate
      },
      {
        type: 'date',
        label: 'End Date',
        name: 'endDate',
        value: this.loan().getEndDate
      },
      {
        type: 'select',
        label: 'Member',
        name: 'member',
        asyncOptions: this.loanService.getMembers()
          .pipe(
            map(members => members.map(member => {
              return { label: member.name, value: member.id }
            }))
          ),
        value: this.loan()?.member?.id
      }
    ]
  }

  public onSave() {
    const loan = new Loan(this.loan());
    loan.id = this.data?.id;
    loan.status = this.data.status;
    loan.member = new Member({id: (this.loan().member as any)});
    this.dialogRef.close(loan);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
