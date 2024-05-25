import { Validators } from "@angular/forms";

interface FormFieldConfig {
    name: string,
    label: string,
    placeholder: string,
    validators?: Validators,
    value: any
}

interface FieldInput extends FormFieldConfig {
    type: 'input',
}

interface FieldSelect extends FormFieldConfig {
    type: 'select',
    options: any[]
}

interface FieldTextArea extends FormFieldConfig {
    type: 'textarea'
}

interface FieldRadio extends FormFieldConfig {
    type: 'radio',
    options: any[]
}

interface FieldChecbox extends FormFieldConfig {
    type: 'checkbox',
    options: any[]
}

interface FieldDate extends FormFieldConfig {
    type: 'date'
}


export type FieldConfig = FieldInput | FieldSelect | FieldTextArea | FieldRadio | FieldChecbox | FieldDate;


