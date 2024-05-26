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
}