import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, forwardRef, inject, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Utils } from '../utils';

@Component({
  selector: 'textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFieldComponent),
      multi: true,
    },
  ],
})
export class TextareaFieldComponent implements ControlValueAccessor, OnInit {
  private injector = inject(Injector);
  @Input() placeholder: string;
  @Input() label: string;
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Input() errorMessage: string;
  public formControl: FormControl;
  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
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
    if (isDisabled) {
      this.formControl.disable({onlySelf: isDisabled})
    }
    else {
      this.formControl.enable({onlySelf: isDisabled})
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
    this.onTouched();
  }

}
