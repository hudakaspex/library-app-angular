import { Component, Input, OnInit, forwardRef } from "@angular/core";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements OnInit {
  @Input() placeholder: string;

  @Input() label: string;

  @Input() appearance: MatFormFieldAppearance = "fill";

  value: string = "";

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(value: any): void {
    this.value = value;
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

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }
}