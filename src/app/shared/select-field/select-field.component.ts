import { CommonModule } from '@angular/common';
import { Component, Inject, Injector, Input, OnInit, forwardRef, inject } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Utils } from '../utils';

@Component({
  selector: 'select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SelectFieldComponent implements OnInit {
  private injector = inject(Injector);
  @Input() label: string;
  @Input() options: {value: any, label: string}[];
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Input() errorMessage: string;
  public formControl: FormControl;

  value: string = "";
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.formControl = Utils.getFormControl(this.injector);
  }

  writeValue(value: any): void {
    if (Utils.isNotEmpty(value)) {
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

  onSelectChange(value: any): void {
    this.onChange(this.formControl.value);
  }
}
