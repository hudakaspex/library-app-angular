import { Injector } from "@angular/core";
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NgModel } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, pipe } from "rxjs";

export abstract class Utils {
    static searchPipe() {
        return pipe(
            distinctUntilChanged(),
            debounceTime(500),
            filter((val: string) => val.length >= 3 || val.length == 0)
        );
    }

    static isEmpty(val: any): boolean {
        let isEmpty = false;
        if (val == null || val == undefined || val == "") {
            isEmpty = true;
        }
        return isEmpty;
    }

    static isNotEmpty(val: any): boolean {
        let isNotEmpty = false;
        if (val != null && val != undefined && val != "") {
            isNotEmpty = true;
        }
        return isNotEmpty;
    }

    static getFormControl(injector: Injector): FormControl<any> {
        if (injector) {
            const ngControl = injector.get(NgControl, null);
            let formControl: FormControl = new FormControl();
            if (ngControl) {
                switch (ngControl?.constructor) {
                    case NgModel: {
                        const { control, update } = ngControl as NgModel;
                        formControl = control;
                        break;
                    }
                    case FormControlName: {
                        formControl = injector.get(FormGroupDirective).getControl(ngControl as FormControlName);
                        break;
                    }
                    default: {
                        formControl = (ngControl as FormControlDirective)?.form as FormControl;
                        break;
                    }
                }
            }
            return formControl;
        }
        return new FormControl();
    }
}