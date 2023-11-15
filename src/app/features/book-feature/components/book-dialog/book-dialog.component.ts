import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookType } from '../../core/models/book-type.enum';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
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
