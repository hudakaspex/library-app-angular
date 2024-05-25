import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FieldConfig } from './models/field-config.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { SelectFieldComponent } from '../select-field/select-field.component';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';
import { DatepickerFieldComponent } from '../datepicker-field/datepicker-field.component';

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
    private formBuilder = inject(FormBuilder);
    public form: FormGroup;

    public fieldConfigs: FieldConfig[] = [];
    @Input({alias: "fieldConfigs", required: true}) set _fieldConfigs(fieldConfigs: FieldConfig[]) {
        if (fieldConfigs) {
            this.fieldConfigs = fieldConfigs;
            this.initFormGroup();
        }
    };

    private initFormGroup() {
        this.form = this.formBuilder.group({});
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
