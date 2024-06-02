import { Component, inject, Inject, signal, WritableSignal } from '@angular/core';
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
import { BookService } from '../../core/services/book.service';
import { map, shareReplay } from 'rxjs';
import { Author } from 'app/features/author-feature/core/models/author.model';

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
  private bookService = inject(BookService);
  public authors$ = this.bookService.getAuthors()
  .pipe(shareReplay(), map(authors => {
    return authors.map(author => {
      return {label: author.name, value: author.id}
    })
  }));
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
      },
      {
        type: 'select',
        label: 'Author',
        name: 'authorId',
        asyncOptions: this.authors$,
        value: this.book()?.author?.id
      }
    ]
  }

  public onSave() {
    const book = new Book(this.book());
    book.id = this.data?.id;
    book.author = new Author({id: this.book()['authorId']});
    this.dialogRef.close(book);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
