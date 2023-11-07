import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookDialogComponent } from 'app/features/book-feature/components/book-dialog/book-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  declarations: [InputFieldComponent, BookDialogComponent],
  exports: [InputFieldComponent]
})
export class InputFieldModule { }
