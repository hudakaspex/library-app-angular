import { Observable } from "rxjs";

export interface FieldValidator {
    type: 'required' | 'email' | 'min' | 'max' | 'phone';
    errorMessage: string;
    value?: any
}

interface FormFieldConfig {
    name: string,
    label: string,
    placeholder?: string,
    validators?: FieldValidator[],
    value?: any,
    cssClass?: string
}

interface FieldInput extends FormFieldConfig {
    type: 'input',
    fieldType: 'text' | 'number' | 'phone' | 'email'
}

interface FieldSelect extends FormFieldConfig {
    type: 'select',
    options?: {label: string, value: any}[],
    asyncOptions?: Observable<{label: string, value: any}[]>;
    hasClear?: boolean
}

interface FieldTextArea extends FormFieldConfig {
    type: 'textarea'
}

interface FieldRadio extends FormFieldConfig {
    type: 'radio',
    options: {label: string, value: any}[],
}

interface FieldChecbox extends FormFieldConfig {
    type: 'checkbox',
    options: {label: string, value: any}[],
}

interface FieldDate extends FormFieldConfig {
    type: 'date'
}


export type FieldConfig = FieldInput | FieldSelect | FieldTextArea | FieldRadio | FieldChecbox | FieldDate;


