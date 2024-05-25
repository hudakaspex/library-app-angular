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
    TextareaFieldComponent
  ]
})
export class AuthorDialogComponent {
  public author: WritableSignal<Author>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Author,
    private dialogRef: MatDialogRef<AuthorDialogComponent>
  ) {
    const author = this.data ? this.data : new Author();
    this.author = signal(author);
  }

  public onSave() {
    this.dialogRef.close(this.author());
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
