import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { BookType } from '../../core/models/book-type.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { InputFieldComponent } from 'app/shared/input-field/input-field.component';
import { SelectFieldComponent } from 'app/shared/select-field/select-field.component';
import { DatepickerFieldComponent } from 'app/shared/datepicker-field/datepicker-field.component';
import { GenericFormComponent } from 'app/shared/generic-form/generic-form.component';
import { FieldConfig } from 'app/shared/generic-form/models/field-config.model';

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
    DialogComponent,
    GenericFormComponent
  ],
})
export class BookDialogComponent {
  public book: WritableSignal<Book>;
  public typeOptions = [
    { value: BookType.FICTION, label: "Fiction" },
    { value: BookType.SELF_DEVELOPMENT, label: "Self Development" },
  ];
  public fieldConfigs: FieldConfig[] = [];

  constructor(
    private dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {
    data = data ? data : new Book();
    this.book = signal(data);
    this.initFormConfig();
  }

  private initFormConfig() {
    this.fieldConfigs = [
      {
        type: 'input',
        label: 'Title',
        fieldType: 'text',
        name: 'title',
        placeholder: 'Title',
        validators: [
          { type: 'required', errorMessage: 'Title is required' }
        ],
        value: this.book()?.title
      },
      {
        type: 'date',
        label: 'Publication Date',
        name: 'publicationDate',
        placeholder: 'Publication Date',
        value: this.book().publicationInDate
      },
      {
        type: 'input',
        label: 'ISBN',
        name: 'isbn',
        fieldType: 'text',
        value: this.book().isbn
      },
      {
        type: 'select',
        label: 'Book Genre',
        name: 'type',
        options: this.typeOptions,
        value: this.book().type
      }
    ]
  }

  public onSave() {
    const book = new Book(this.book());
    book.id = this.data?.id;
    this.dialogRef.close(book);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
