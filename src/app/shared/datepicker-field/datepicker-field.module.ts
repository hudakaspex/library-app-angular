import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerFieldComponent } from './datepicker-field.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
  ],
  declarations: [DatepickerFieldComponent],
  exports: [DatepickerFieldComponent]
})
export class DatepickerFieldModule { }
