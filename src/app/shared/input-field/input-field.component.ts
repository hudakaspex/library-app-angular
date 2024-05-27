import { CommonModule } from "@angular/common";
import { Component, Injector, Input, OnInit, forwardRef, inject } from "@angular/core";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldAppearance, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Utils } from "../utils";

@Component({
  selector: "input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InputFieldComponent implements ControlValueAccessor, OnInit {
  private injector = inject(Injector);
  @Input() placeholder: string;
  @Input() label: string;
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Input() type = "text";
  @Input() errorMessage: string;
  public formControl: FormControl;

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    this.formControl = Utils.getFormControl(this.injector);
  }

  writeValue(value: any): void {
    if (this.formControl) {
      this.formControl.setValue(value);
    }
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
    this.onChange(this.formControl.value);
  }
}
