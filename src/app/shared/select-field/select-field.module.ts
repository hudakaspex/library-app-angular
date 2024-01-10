import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './select-field.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  declarations: [SelectFieldComponent],
  exports: [SelectFieldComponent]
})
export class SelectFieldModule { }
