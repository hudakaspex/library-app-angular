import { CommonModule } from "@angular/common";
import { Component, Injector, Input, OnInit, forwardRef, inject } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldAppearance, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Utils } from "../utils";

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
    ReactiveFormsModule
  ]
})
export class DatepickerFieldComponent implements OnInit, ControlValueAccessor {
  private injector = inject(Injector);
  @Input() label = "Choose a date";
  @Input() date: any;
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Input() errorMessage: string;
  public formControl: FormControl;
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.formControl = Utils.getFormControl(this.injector);
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
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
    }
    this.onChange(utcDate);
  }
}
