import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FieldConfig, FieldValidator } from './models/field-config.model';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { SelectFieldComponent } from '../select-field/select-field.component';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';
import { DatepickerFieldComponent } from '../datepicker-field/datepicker-field.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Utils } from '../utils';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'generic-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputFieldComponent,
        SelectFieldComponent,
        TextareaFieldComponent,
        DatepickerFieldComponent,
        MatFormFieldModule
    ],
    templateUrl: './generic-form.component.html',
    styleUrl: './generic-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericFormComponent {
    @Output() submitForm = new EventEmitter(true);
    @Output() formChanges = new EventEmitter(true);

    private formBuilder = inject(FormBuilder);
    public form = this.formBuilder.group({});

    public fieldConfigs: FieldConfig[] = [];
    @Input({ alias: "fieldConfigs", required: true }) set _fieldConfigs(fieldConfigs: FieldConfig[]) {
        if (fieldConfigs) {
            this.fieldConfigs = fieldConfigs;
            this.initFormGroup();
        }
    };

    constructor() {
        this.form.valueChanges
            .pipe(
                filter(form => Utils.isNotEmpty(form)),
                takeUntilDestroyed()
            )
            .subscribe(form => this.formChanges.emit(form))
    }

    private initFormGroup() {
        this.fieldConfigs.forEach(field => {
            this.form.addControl(
                field.name,
                this.formBuilder.nonNullable.control(field.value || '', this.bindValidators(field.validators))
            )
        });
    }

    private bindValidators(validators: FieldValidator[]): any {
        if (validators.length > 0) {
            const validatorList = validators.map(validator => {
                if (validator.type === 'required') {
                    return Validators.required;
                } else if (validator.type === 'email') {
                    return Validators.email;
                } else if (validator.type === 'min') {
                    return Validators.min(validator.value);
                } else if (validator.type === 'max') {
                    return Validators.max(validator.value);
                }
                // Add more validator types as needed
            });
            return Validators.compose(validatorList);
        }
        return [];
    }

    public getErrorMessage(field: FieldConfig): string {
        const control: AbstractControl = this.form.get(field.name);
        if (control?.hasError('required')) {
            return field.validators.find(v => v.type === 'required').message;
        } else if (control?.hasError('email')) {
            return field.validators.find(v => v.type === 'email').message;
        } else if (control?.hasError('min')) {
            return field.validators.find(v => v.type === 'min').message;
        } else if (control?.hasError('max')) {
            return field.validators.find(v => v.type === 'max').message;
        }
        return '';
    }

    public onSubmit() {
        this.submitForm.emit(this.form.value);
    }

}
