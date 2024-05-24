import { Component, Inject } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { BookType } from '../../core/models/book-type.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { InputFieldComponent } from 'app/shared/input-field/input-field.component';
import { SelectFieldComponent } from 'app/shared/select-field/select-field.component';
import { DatepickerFieldComponent } from 'app/shared/datepicker-field/datepicker-field.component';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputFieldComponent,
    SelectFieldComponent,
    DatepickerFieldComponent,
    DialogComponent
  ],
})
export class BookDialogComponent {
  public book: Book;
  public typeOptions = [
    { value: BookType.FICTION, label: "Fiction" },
    { value: BookType.SELF_DEVELOPMENT, label: "Self Development" },
  ];

  constructor(
    private dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {
    this.book = data ? new Book(data) : new Book();
  }

  public onSave() {
    this.dialogRef.close(this.book);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
