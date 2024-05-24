import { debounceTime, distinctUntilChanged, filter, pipe } from "rxjs";

export abstract class Utils {
    static searchPipe() {
        return pipe(
            distinctUntilChanged(),
            debounceTime(500),
            filter((val: string) => val.length >= 3 || val.length == 0)
        );
    }
}