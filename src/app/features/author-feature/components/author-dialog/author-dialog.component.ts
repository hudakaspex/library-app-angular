import { CommonModule } from '@angular/common';
import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatepickerFieldComponent } from 'app/shared/datepicker-field/datepicker-field.component';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { InputFieldComponent } from 'app/shared/input-field/input-field.component';
import { SelectFieldComponent } from 'app/shared/select-field/select-field.component';
import { TextareaFieldComponent } from 'app/shared/textarea-field/textarea-field.component';
import { Author } from '../../core/models/author.model';
import { GenericFormComponent } from 'app/shared/generic-form/generic-form.component';
import { FieldConfig } from 'app/shared/generic-form/models/field-config.model';
import { Utils } from 'app/shared/utils';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    InputFieldComponent,
    FormsModule,
    DatepickerFieldComponent,
    SelectFieldComponent,
    TextareaFieldComponent,
    GenericFormComponent
  ]
})
export class AuthorDialogComponent {
  public author: WritableSignal<Author>;
  public formConfig: FieldConfig[] = [];
  public isFormValid = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Author,
    private dialogRef: MatDialogRef<AuthorDialogComponent>
  ) {
    const author = this.data ? this.data : new Author();
    this.author = signal(author);
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: 'input',
        fieldType: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        validators: [
          { type: 'required', errorMessage: 'Name is required' }
        ],
        value: this.author().name
      },
      {
        type: 'date',
        label: 'Birthdate',
        name: 'birthdate',
        value: this.author().birthdateInDate
      },
      {
        type: 'input',
        label: 'Email',
        name: 'email',
        fieldType: 'email',
        value: this.author().email,
        validators: [
          { type: 'email', errorMessage: 'Invalid Email Format' }
        ]
      },
      {
        type: 'input',
        label: 'Phone',
        name: 'phone',
        fieldType: 'phone',
        value: this.author().phone
      },
      {
        type: 'textarea',
        label: 'Address',
        name: 'address',
        cssClass: 'col-12',
        value: this.author().address
      },
    ]
  }

  public onSave() {
    const author = new Author(this.author());
    author.id = this.data.id;
    this.dialogRef.close(author);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
