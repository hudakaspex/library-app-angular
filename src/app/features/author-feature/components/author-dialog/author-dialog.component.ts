import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerFieldComponent } from 'app/shared/datepicker-field/datepicker-field.component';
import { DialogComponent } from 'app/shared/dialog/dialog.component';
import { InputFieldComponent } from 'app/shared/input-field/input-field.component';
import { SelectFieldComponent } from 'app/shared/select-field/select-field.component';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    InputFieldComponent,
    FormsModule,
    DatepickerFieldComponent,
    SelectFieldComponent
  ]
})
export class AuthorDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onSave() {
  }

  public onCancel() {
  }

}
