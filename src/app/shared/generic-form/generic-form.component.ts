import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FieldConfig } from './models/field-config.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { SelectFieldComponent } from '../select-field/select-field.component';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';
import { DatepickerFieldComponent } from '../datepicker-field/datepicker-field.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Utils } from '../utils';

@Component({
    selector: 'generic-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputFieldComponent,
        SelectFieldComponent,
        TextareaFieldComponent,
        DatepickerFieldComponent
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
                this.formBuilder.control(field.value || '', field.validators || [])
            )
        });
    }

    public onSubmit() {
        this.submitForm.emit(this.form.value);
    }

}
