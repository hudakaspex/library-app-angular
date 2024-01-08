import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerFieldComponent } from './datepicker-field.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
