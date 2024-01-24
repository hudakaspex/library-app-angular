import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { BookType } from '../../core/models/book-type.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'app/shared/dialog/dialog.module';
import { InputFieldModule } from 'app/shared/input-field/input-field.module';
import { SelectFieldModule } from 'app/shared/select-field/select-field.module';
import { DatepickerFieldModule } from 'app/shared/datepicker-field/datepicker-field.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DialogModule,
    InputFieldModule,
    SelectFieldModule,
    DatepickerFieldModule,
  ],
})
export class BookDialogComponent implements OnInit {
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

  ngOnInit() {}

  public onSave() {
    this.dialogRef.close(this.book);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
