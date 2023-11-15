import { Component, Input, OnInit, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";

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
})
export class DatepickerFieldComponent implements OnInit {
  @Input() label = "Choose a date";
  @Input() date: any;
  @Input() appearance: MatFormFieldAppearance = "fill";

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
