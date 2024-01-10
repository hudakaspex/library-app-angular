import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerFieldComponent } from './datepicker-field.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
