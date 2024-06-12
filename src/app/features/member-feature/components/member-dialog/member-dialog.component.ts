import { CommonModule } from '@angular/common';
import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { GenericFormComponent } from 'app/shared/generic-form/generic-form.component';
import { FieldConfig } from 'app/shared/generic-form/models/field-config.model';
import { Member } from '../../core/models/member.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GenericFormComponent,
    DialogComponent
  ]
})
export class MemberDialogComponent {
  public isFormValid = signal(false);
  public member: WritableSignal<Member>;
  public formConfig: FieldConfig[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Member,
    private dialogRef: MatDialogRef<MemberDialogComponent>
  ) {
    const member = this.data ? this.data : new Member();
    this.member = signal(member);
    this.initFormConfig();
  }

  initFormConfig() {
    this.formConfig = [
      {
        fieldType: 'text', label: 'Name', name: 'name', type: 'input',
        value: this.member().name,
        validators: [
          { type: 'required', errorMessage: 'Name is required' }
        ]
      },
      {
        fieldType: 'phone', label: 'Phone', name: 'phone', type: 'input',
        value: this.member().phone,
        validators: [
          { type: 'phone', errorMessage: 'Invalid phone number' }
        ]
      },
      {
        fieldType: 'text', label: 'Address', name: 'address', type: 'input',
        value: this.member().address,
      },
      {
        fieldType: 'email', label: 'Email', name: 'email', type: 'input',
        value: this.member().email,
        validators: [
          { type: 'email', 'errorMessage': 'Invalid email' }
        ]
      },
      {
        label: 'Date Joined', name: 'dateJoined', type: 'date',
        value: this.member().getDateJoined,
      },
    ]
  }

  public onSave() {
    const member = new Member(this.member());
    member.id = this.data?.id;
    this.dialogRef.close(member);
  }

  public onCancel() {
    this.dialogRef.close(false);
  }

}
