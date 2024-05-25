import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, forwardRef } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldAppearance, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "datepicker-field",
  templateUrl: "./datepicker-field.component.html",
  styleUrls: ["./datepicker-field.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerFieldComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
  ]
})
export class DatepickerFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label = "Choose a date";
  @Input() date: any;
  @Input() appearance: MatFormFieldAppearance = "outline";


  onChange: any = () => {};
  onTouched: any = () => {};
  constructor() {}

  ngOnInit() {}

  writeValue(value: any): void {
    this.date = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this method if your custom component should support disabling.
  }

  onDateChange(event): void {
    this.date = (event.target as HTMLInputElement).value;
    let utcDate: string;
    if (this.date) {
      utcDate = this.date.toISOString();
      console.log(utcDate);
    }
    this.onChange(utcDate);
  }
}
